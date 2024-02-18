import { useEffect,useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {AdminTitle} from '../../../utils/tools';
import { getPaginateArticles } from "../../../store/actions/aritcleThunk";
import PaginateComponent from "./paginate";
import { changeArticleStatus,removeArticles } from "../../../store/actions/aritcleThunk";

import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl

} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';




const AdminArticles  = ()=>{
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [removeAlert,setRemoveAlert] = useState(false);
    const [toRemove,setRemove] = useState(null);

    const handleClose = ()=>{
        setRemoveAlert(false)
    }
    const handleShow =  (id=null)=>{
        setRemove(id);
        setRemoveAlert(true);
        // alert(id);
    }

    const handleDelete = ()=>{
        // alert(toRemove);
        dispatch(removeArticles(toRemove))
        .unwrap()
        .finally(()=>{
            setRemoveAlert(false);
            setRemove(null);
        })

    }

    ///////////////////////////////Paginate Functions

    const gotoPrevPage = (page)=>{
        dispatch(getPaginateArticles({page}));

    }
    const gotoNextPage = (page)=>{
        dispatch(getPaginateArticles({page}));

    }

    const gotoEdit = (id)=>{
        navigate(`/dashboard/articles/edit/${id}`);
    }

    const handleStatusChange = (status,id)=>{
        let newStatus = status ==='draft'?'public':'draft';
        // console.log(newStatus);
        dispatch(changeArticleStatus({newStatus,id}));
    }

    /////////////////////////////////////////////////

    useEffect(()=>{
        dispatch(getPaginateArticles({}));
    },[]);
    return(
        <>
        <AdminTitle title="Articles"/>
        <div className="articles_table">
            <ButtonToolbar className="mb-3">
                <ButtonGroup className="me-2">
                    <LinkContainer
                    to="/dashboard/articles/add"
                    >
                        <Button variant="secondary" > Add Article</Button>
                    </LinkContainer>

                </ButtonGroup>
                <form>
                    <InputGroup>
                    <InputGroup.Text id="btngr1" >@</InputGroup.Text>
                    <FormControl type="text" placeholder="Search"/>
                    </InputGroup>
                </form>

            </ButtonToolbar>
            <>
                <PaginateComponent articles={articles.adminArticles}
                 gotoEdit={(id)=>gotoEdit(id)}
                 gotoPrevPage={(page)=> gotoPrevPage(page)}
                 gotoNextPage={(page)=> gotoNextPage(page)}
                 handleStatusChange={(status,id)=> handleStatusChange(status,id)}
                 handleShow={(id)=>handleShow(id)}
                 />
            </>

            <Modal show={removeAlert} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure to Remove Article</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                   This article will not be retrieved!!!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close 
                    </Button>
                    <Button variant="danger" onClick={()=>handleDelete()}>
                        Delete
                    </Button>
                </Modal.Footer>

            </Modal>

        </div>
           
        </>
    )
}

export default AdminArticles;