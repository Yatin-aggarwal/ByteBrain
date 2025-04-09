import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os 
load_dotenv()


# Gmail SMTP Server Configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# Sender Credentials
sender_email = os.getenv('EMAIL')

app_password = os.getenv("EMAIL_PASSWORD")  # Use App Password (16-digit)



# Create Email
def Email(email):
    receiver_email = email
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "Your Requested ML Paper is Now Available"

# Email Body
    body = f"""The ML paper you requested has been successfully added and is now available for interactive discussions. You can now engage with it through an LLM, allowing you to ask questions and explore its key concepts seamlessly. \nBest regards, \n{"Byte Brain"}"""
    msg.attach(MIMEText(body, "plain"))

# Send Email
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Secure the connection
        server.login(sender_email, app_password)  # Login using App Password
        server.sendmail(sender_email, receiver_email, msg.as_string())
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        server.quit()
    
