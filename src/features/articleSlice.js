import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {fetchArticles,addArticle,deleteArticle,editArticle,fetchArticleById,fetchArticlesPagServ} from "../services/ArticleService"

export const getArticles = createAsyncThunk(
    "article/getArticles",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
      const res = await fetchArticles();
      return res.data;
      }
      catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const createArticle = createAsyncThunk(
    "article/createArticle",
    async (article, thunkAPI) => { 
      const { rejectWithValue } = thunkAPI;
      try{
      const res= await addArticle(article);
      return res.data
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
    }
  );
  
  export const delArticle = createAsyncThunk(
    "article/delArticle",
    async (id,thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try{
      await deleteArticle(id);
      return  id ;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
    });

  export const updateArticle = createAsyncThunk(
      "article/updateArticle",
      async (article, thunkAPI) => { 
      const { rejectWithValue } = thunkAPI;
        try{ 
       const res= await editArticle(article);
        return res.data
      
      }
      catch (error) { 
        return rejectWithValue(error.message);
      }
     
      }
    );

  export const findArticleByID = createAsyncThunk(
    "article/findArticleByID",
    async (id,thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try{
      const res = await fetchArticleById(id);
      return res.data;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
    });

// Create an asynchronous thunk to fetch paginated article data from the server

export const fetchArticlesPag = createAsyncThunk( 

  'articles/fetchArticlesPag',

  async (mesParams,thunkAPI) => {  
    const { rejectWithValue } = thunkAPI;
    try{
      const res = await fetchArticlesPagServ(mesParams.filtre,mesParams.currentPage,mesParams.itemsPerPage)
     
      return res;

    } catch (error) {

      return rejectWithValue(error.message);

    }

  }

);
/*
export const getTot = createAsyncThunk(
  "article/getTot",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
    const res = await fetchTot();
    return res.data.tot;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
*/
export const articleSlice = createSlice({
  name: 'article',
  initialState:{
    articles:[],
    article:{},
    isLoading: false,
    success:null,
    error:null,
    tot:5
  },
  
  
  extraReducers: (builder) => {
    //get articles
    builder
    .addCase(getArticles.pending, (state, action) => {
    
      state.isLoading=true;
      state.error=null;
    })
    .addCase(getArticles.fulfilled, (state, action) => {
      state.isLoading=false;
      state.error = null;
      state.articles=action.payload;
    })
    .addCase(getArticles.rejected, (state, action) => {
      state.isLoading=false;
      state.error=action.payload;
      console.log("impossible de se connecter au serveur")
    })

    //insertion article
    .addCase(createArticle.pending, (state, action) => {
      state.isLoading=true;
      state.error=null;
      state.success=null;
    })
    .addCase(createArticle.fulfilled, (state, action) => {
     
      state.articles.push(action.payload);
      state.isLoading=false;
      state.error=null;
      state.success=action.payload;
    })
    .addCase(createArticle.rejected, (state, action) => {
      state.isLoading=false;
      state.error=action.payload;
      state.success=null;
    })
    //Modification article
    .addCase(updateArticle.pending, (state, action) => {
      state.isLoading=true;
      state.error=null;  
      state.success=null;  
    })
    .addCase(updateArticle.fulfilled, (state, action) => { 
      state.articles = state.articles.map((item) =>
      item._id === action.payload._id ? action.payload : item
    ); 
  state.isLoading=false;
  state.error=null; 
  state.success=action.payload;
     })
    //Delete article
    .addCase(delArticle.pending, (state, action) => {
      state.isLoading=true;
      state.error=null;     
    })
    .addCase(delArticle.fulfilled, (state, action) => {
      state.isLoading=false;
      state.error=null;   
      state.articles=state.articles.filter((item)=> item._id!==action.payload)
    
    })
    .addCase(delArticle.rejected, (state, action) => {
      state.isLoading=false;
      state.error=action.payload;          
    })
  //Fectch article
    .addCase(findArticleByID.pending, (state, action) => {
      state.isLoading = true
      state.error=null;   
        
      })
    .addCase(
     findArticleByID.fulfilled,(state, action) => { 
      state.isLoading = false
      state.error = null
      state.article=action.payload;
   })
   //Paginate
   .addCase(fetchArticlesPag.pending, (state) => {

    state.isLoading = true;

    state.error = null;

  })

  .addCase(fetchArticlesPag.fulfilled, (state, action) => {

    state.isLoading = false;

    state.articles = action.payload.articles;

    state.tot = action.payload.longueur;
    
  })

  .addCase(fetchArticlesPag.rejected, (state, action) => {

    state.isLoading = false;

    state.error = action.payload;

  })
/*
  //TOT nb Pages
  .addCase(getTot.pending, (state) => {

     state.error = null;

  })

  .addCase(getTot.fulfilled, (state, action) => {

     state.tot = action.payload;
    
  })

  .addCase(getTot.rejected, (state, action) => {

     state.error = action.payload;

  });
  */
  }

  }
  
)

export default articleSlice.reducer;
