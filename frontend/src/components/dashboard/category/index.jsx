import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTitle } from "../../../utils/tools";
import {Table,Row,Col} from 'react-bootstrap';

////////////
import { getCategories } from "../../../store/actions/aritcleThunk";
import AddCategory from "./addCategories";


const AdminCategories = ()=>{
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch(); 

    useEffect(()=>{
        dispatch(getCategories({}));

    },[dispatch]);
    return(
        <>
        <AdminTitle title="Categories"/> 
        <Row>
            <Col>
                <Table striped hover bordered>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.categories 
                            ?
                            articles.categories.map(category=>(
                                <tr key={category._id}>
                                    <td>
                                        {category.name}
                                    </td>

                                </tr>
                            ))
                            :
                            null
                        }
                    </tbody>


                </Table>
            </Col>
            <Col>
                <AddCategory/> 
            </Col>

        </Row>
        </>
    )
}
export default AdminCategories;