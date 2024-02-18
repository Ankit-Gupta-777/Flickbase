import { useEffect, useRef, useState } from 'react';
import {useFormik,FieldArray,FormikProvider} from 'formik';
import {useNavigate, useParams} from 'react-router-dom';
import {AdminTitle,errorHelper,Loader} from '../../../../utils/tools';
import { formValues,validation } from './validationSchema';
import WYSIWYG from '../../../../utils/form/tiptap';


//REDUX
import {useSelector,useDispatch} from 'react-redux';
import { getCategories, getAdminArticle,updateArticle,getPaginateArticles} from '../../../../store/actions/aritcleThunk';

//MUI IMPORTS
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button' 
import Divider from '@mui/material/Divider' 
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';

const EditArticles = ()=>{
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const actorsValue = useRef();
    const {articleId} = useParams();
    const [formdata,setFormdata] = useState(formValues);
    const [editorContent,setEditorContent] = useState(null);
    const [loading,setLoading] = useState(true);

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:formdata,
        validationSchema:validation,
        onSubmit:(values)=>{
            // console.log(values);
            // dispatch(addArticle(values))
            // .unwrap()
            // .then(()=>{
            //     navigate('/dashboard/articles');
            // })
            dispatch(updateArticle({values,articleId }));
            navigate('/dashboard/articles');
            // dispatch(getPaginateArticles({}));


        }
    });

    const handleEditorState = (state)=>{
        formik.setFieldValue('content',state,true);
    }

    useEffect(()=>{
        dispatch(getCategories({}));    
        dispatch(getAdminArticle(articleId))
        .unwrap()
        .then(response=>{
            // console.log(response);
            if(response.category){
                response.category = response.category._id;
            }
            setFormdata(response);
            setEditorContent(response.content);
            setLoading(false);

        })
    },[dispatch])
    return(
        <>
            <AdminTitle title="Edit Article"/>
            {
                loading
                ?
                <Loader/> 
                :
               
            <form className='mt-3 article_form' onSubmit={formik.handleSubmit}>

                <div className='form-group'>
                    <TextField
                    style={{width:'100%'}}
                    name='title'
                    label='Enter the Title'
                    variant='outlined'
                    {...formik.getFieldProps('title')}
                    {...errorHelper(formik,'title')}
                    />

                </div>
                {
                    editorContent
                    ?
                    <div className='form-group'>
                        <WYSIWYG  editorContent={editorContent}  handleEditorState={(state)=>handleEditorState(state)}/>
                    </div>
                    :
                    null
                }


                <div className='form-group'>
                    <TextField
                    style={{width:'100%'}}
                    name='excerpt'
                    label='Enter a Short Description'
                    variant='outlined'
                    {...formik.getFieldProps('excerpt')}
                    {...errorHelper(formik,'excerpt')}
                    multiline
                    rows={4}
                    />

                </div>
                <Divider className='mt-3 mb-3'/>
                <div className='form-group'>
                    <TextField
                    style={{width:'100%'}}
                    name='score'
                    label='Enter a Score'
                    variant='outlined'
                    {...formik.getFieldProps('score')}
                    {...errorHelper(formik,'score')}
                    />

                </div>
                <div className='form-group'>
                    <FormikProvider value={formik}> 
                        {
                            //this FormikProvider will tell FieldArray about the arrays which we will provide,,, using the instance Formik
                        }
                        <FieldArray
                        name='actors'
                        render={ arrayHelpers =>(
                            <div>
                                <Paper className='actors_form'>
                                    <InputBase
                                    inputRef={actorsValue}
                                    className='input'
                                    placeholder='Add actor name here'
                                    />
                                    <IconButton
                                    onClick={()=>{
                                        if(actorsValue.current.value !== ''){
                                            arrayHelpers.push(actorsValue.current.value);
                                        }
                                        actorsValue.current.value = '';
                                    }}
                                    >
                                        <AddIcon/>
                                    </IconButton>

                                </Paper>
                                {
                                    formik.errors.actors && formik.touched.actors
                                    ?
                                    <FormHelperText error={true}>
                                        {  formik.errors.actors }
                                    </FormHelperText>
                                    :
                                    null

                                }
                                <div className='chip_container'>
                                    {
                                        formik.values.actors.map(((actor,index)=>(
                                            <div key={index}  className='actors_chip'>
                                                <Chip
                                                 label={`${actor}`}
                                                 color='primary'
                                                 onDelete={()=>{
                                                    arrayHelpers.remove(index)

                                                 }}
                                                 />

                                            </div>


                                        )))
                                    }

                                </div>

                            </div>
                        )}
                        /> 
                    </FormikProvider>
                </div>

                <div className='form-group'>
                    <TextField
                    style={{width:'100%'}}
                    name='director'
                    label='Enter the name of the Director'
                    variant='outlined'
                    {...formik.getFieldProps('director')}
                    {...errorHelper(formik,'director')}
                    />

                </div>
                <Divider className='mt-3 mb-3'/>

                <FormControl fullWidth>
                    <InputLabel>Select a Status</InputLabel>
                    <Select
                    name='status'
                    label="Select Status"
                    {...formik.getFieldProps('status')}
                    error={formik.errors.status && formik.touched.status ?true : false}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="public">Public</MenuItem>

                    </Select>

                    {
                        formik.errors.status && formik.touched.status
                        ?
                        <FormHelperText error={true}>
                            {  formik.errors.status }
                        </FormHelperText>
                        :
                        null

                    }

                </FormControl>
                <Divider className='mt-3 mb-3'/>
                <Divider className='mt-3 mb-3'/>
                <FormControl fullWidth>
                    <InputLabel>Select a Category</InputLabel>
                    <Select
                    name='category'
                    label="Select Category"
                    {...formik.getFieldProps('category')}
                    error={formik.errors.category && formik.touched.category ?true : false}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            articles.categories 
                            ?
                            articles.categories.map((category,index)=>(
                                <MenuItem key={category._id} value={category._id}>{
                                    category.name
                                }</MenuItem>
                            ))
                            :
                            null
                        }
                        

                    </Select>

                    {
                        formik.errors.category && formik.touched.category
                        ?
                        <FormHelperText error={true}>
                            {  formik.errors.category }
                        </FormHelperText>
                        :
                        null

                    }

                </FormControl>
                <Divider className='mt-3 mb-3'/>

               {
                articles.loading
                ?
                    <Loader/>
                :
                    <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    >
                        <span>Edit Article</span> 

                    </Button>
               }
            </form>
            
                
            }

        </>
    )
}

export default EditArticles;