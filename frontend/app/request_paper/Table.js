import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export function Paper_Table(props) {
  console.log(props)
  return (
      <>
        <Table className={"h-full w-full mb-[4%]"}  >
          <TableHeader className={"text-xl font-bold"}>
            <TableRow className={"text-orange-500 font-bold"}>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Submitted By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={"text-white  text-lg h-[30%] "} >
              {props.content!= undefined && props.content.map((val, index) => {
              const data = JSON.parse(val)
              return (<>
                <TableRow >
                  <TableCell className="font-medium">{data.date}</TableCell>
                  <TableCell>{data.url}</TableCell>
                  <TableCell>{data.email}</TableCell>
                </TableRow>

              </>)
            })}
          </TableBody>
        </Table>


    </>
  )
}