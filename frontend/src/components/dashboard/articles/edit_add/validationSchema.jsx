import * as Yup from 'yup';


export const formValues = {
    title:'',
    content:'',
    excerpt:'',
    score:'',
    director:'',
    actors:[],
    status:'draft',
    category:''
}

export const validation = ()=>(
    Yup.object({
        title:Yup.string().required("Title is Required"),
        content:Yup.string().required("Content is Required").min(50,"That's it???...Write Some More"),
        excerpt:Yup.string().required("Excerpt is Required").max(500,"Sorry 500 is the Limit"),
        score:Yup.number().required("Score is Required").min(0,"0 is Minimum limit").max(100,"100 is Maximum Limit"),
        director:Yup.string().required("Director name is Required"),
        actors:Yup.array().required("Actors are Required").min(2,"Atleast 2 Actors are Required"),
        status:Yup.string().required("Status is Required"),
        category:Yup.string().required("Category is Required")
    })
)