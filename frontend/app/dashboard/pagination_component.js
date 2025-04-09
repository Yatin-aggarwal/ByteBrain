import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export  function Pagination_component(props) {
  return (
    <Pagination>
      <PaginationContent>

        {Number(props.content)-1 >1 &&<PaginationItem>
          <PaginationPrevious href={Number(props.content)-1} />
        </PaginationItem>}
        {Number(props.content)-1 >1 &&<PaginationItem>
          <PaginationLink href={Number(props.content)-1}>{Number(props.content)-1}</PaginationLink>
        </PaginationItem>
        }
          <PaginationItem>
          <PaginationLink href={`/dashboard/${props.content}`} isActive>
            {props.content}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href ={`/dashboard/${Number(props.content)+1}`}>{Number(props.content)+1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={Number(props.content)+1} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}