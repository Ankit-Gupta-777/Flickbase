import { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { getArticle } from "../../store/actions/aritcleThunk";
import ScoreCards from "../../utils/scoreCards";
import { Loader } from "../../utils/tools";


const Article = ()=>{
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getArticle(id));
     },[id])

    return(
        <>
             {
                articles && articles.current 
                ?
                <div className="article_container">
                    <div style={
                        {
                            background:`url(https://picsum.photos/1920/1080)`
                        }
                    }
                    className="image"
                    >

                    </div>
                    <h1>{articles.current.title}</h1>
                    <div className="mt-3 content">
                        <div dangerouslySetInnerHTML={
                            {__html:articles.current.content}
                        }>

                        </div>

                    </div>
                    <ScoreCards current={articles.current}/>

                </div>

                :
                <Loader/>
             }
        
        </>
    )
}
export default Article;