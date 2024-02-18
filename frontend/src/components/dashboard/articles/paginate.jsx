import { Table,Pagination } from "react-bootstrap";
import { Loader } from "../../../utils/tools";
import Moment from "react-moment";

const PaginateComponent = ({
    articles,
    gotoEdit,
    gotoPrevPage,
    gotoNextPage,
    handleStatusChange,
    handleShow


})=>{

    return (
        <>
            {
                articles && articles.docs
                ?
                <>
                    <Table striped bordered hover className="mobile_table" responsive>
                        <thead>
                            <tr className="mobile_table_row" >
                                <th>Created</th>
                                <th>Title</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                articles.docs.map((doc,index)=>(
                                    <tr key={doc._id} className="mobile_table_row">
                                        <td>
                                            <Moment to={doc.date}>
                                                {/* {doc.date} */}
                                            </Moment>
                                            
                                        </td>
                                        <td>{doc.title}</td>
                                        <td>{doc.score}</td>
                                        <td className="action_btn remove_btn" 
                                        onClick={()=>{
                                           handleShow(doc._id)
                                        }}
                                        >
                                            Remove
                                        </td>
                                        <td className="action_btn edit_btn" 
                                        onClick={()=>{
                                           gotoEdit(doc._id)
                                        }}
                                        >
                                            Edit
                                        </td>
                                        <td className="action_btn status_btn" 
                                        onClick={()=>{
                                            handleStatusChange(doc.status,doc._id);
                                        }}
                                        >
                                            {doc.status}
                                        </td>



                                    </tr>
                                ))
                            }
                        </tbody>

                    </Table>
                    <Pagination>
                        {
                            articles.hasPrevPage
                            ?
                            <>
                                <Pagination.Prev
                                    onClick={()=>gotoPrevPage(articles.prevPage)}
                                />
                                <Pagination.Item  onClick={()=>gotoPrevPage(articles.prevPage)}>
                                    { articles.prevPage }
                                </Pagination.Item>
                            </>
                            :
                            null
                        }
                                 <Pagination.Item active>
                                    { articles.page }
                                </Pagination.Item>
                        {
                            articles.hasNextPage
                            ?
                            <>
                                <Pagination.Item onClick={()=>gotoNextPage(articles.nextPage)}>
                                    { articles.nextPage }
                                </Pagination.Item>
                                <Pagination.Next 
                                  onClick={()=>gotoNextPage(articles.nextPage)}
                                />
                            </>
                            :
                            null
                        }

                       
                    </Pagination>

                </>
                :
                <Loader/>
            }
        </>
    )

}
export default  PaginateComponent;