
import actionTypes from './actionTypes'
const INITIAL_STATE = {  
    designConfig: { texts: [], shapes: [], drawings:[], nextDrawingConfig:{color: '#FFFFFF', tool: 'pen' },images: [],stickers: [],selectedId: null}
  };

  const canvasReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.ADD_TEXT:
           return {...state, designConfig: {...state.designConfig, texts: [...state.designConfig.texts, action.payload] }}     
        case actionTypes.UPDATE_TEXT:
          let newData =  updateObjectInArray(state.designConfig.texts, action)
           return {...state, designConfig: {...state.designConfig, texts: newData}}
       case actionTypes.SET_TEXT_SCALE:
            let ind =  state.designConfig.texts.findIndex(text => text.id === action.textId)
            action.index = ind;
            action.key = 'scale'
            let newText=  updateObjectInArray(state.designConfig.texts, action)
            return {...state, designConfig: {...state.designConfig, texts: newText}}
        case actionTypes.SET_TEXT_POSITION:
            let itemindex =  state.designConfig.texts.findIndex(text => text.id === action.textId)
            action.index = itemindex;
            action.key = 'x'
            action.value = action.x 
            let newText1=  updateObjectInArray(state.designConfig.texts, action)
            action.key = 'y'
            action.value = action.y 
            let newText2=  updateObjectInArray(newText1, action)
            return {...state, designConfig: {...state.designConfig, texts: newText2}}
         case actionTypes.ADD_SHAPE:
            return {...state, designConfig: {...state.designConfig, shapes:[...state.designConfig.shapes, action.payload]}}
         case actionTypes.UPDATE_SHAPE:
           let shapeData =  updateObjectInArray(state.designConfig.shapes, action)        
            return {...state, designConfig: {...state.designConfig, shapes: shapeData}}            
        
          case actionTypes.SET_SHAPE_SCALE:
            let index =   state.designConfig.shapes.findIndex(shape => shape.id === action.shapeId)
            console.log('index', index)
            action.index = index;
            action.key = 'scale'
            let newShape=  updateObjectInArray(state.designConfig.shapes, action)
            return {...state, designConfig: {...state.designConfig, shapes: newShape }} 
         case actionTypes.SET_SHAPE_POSITION:
            let shape_index =  state.designConfig.shapes.findIndex(shape => shape.id === action.shapeId)
            console.log('index', shape_index)           
            action.index = shape_index;
            action.key = 'x'
            action.value = action.x 
            let newShape1=  updateObjectInArray(state.designConfig.shapes, action)
            action.key = 'y'
            action.value = action.y 
            let newShape2=  updateObjectInArray(newShape1, action)
            return {...state, designConfig: {...state.designConfig, shapes: newShape2 }}
         case actionTypes.SET_DRAW_CONFIG:
              return {...state,  designConfig: {...state.designConfig, nextDrawingConfig:{...state.designConfig.nextDrawingConfig, ...action.payload}}}    
         case actionTypes.ADD_LINES:
             return {...state, designConfig: {...state.designConfig, drawings:[...action.payload]}} 
         case actionTypes.ADD_IMAGE:
             return {...state, designConfig: {...state.designConfig, images: [...state.designConfig.images, action.payload]}}    
        
         case actionTypes.SET_IMG_SCALE: 
             let i =  state.designConfig.images.findIndex(img => img.id === action.imgId)
             action.index = i;
             action.key = 'scale'
             let newImg=  updateObjectInArray(state.designConfig.images, action)
             return {...state, designConfig: {...state.designConfig, images: newImg}}
         case actionTypes.SET_IMG_POSITION:
              let i1 =  state.designConfig.images.findIndex(img => img.id === action.imgId)
              action.index = i1;
              action.key = 'x'
              action.value = action.x 
              let newImg1=  updateObjectInArray(state.designConfig.images, action)
              action.key = 'y'
              action.value = action.y 
              let newImg2=  updateObjectInArray(newImg1, action)
              return {...state, designConfig: {...state.designConfig, images: newImg2}}
         case actionTypes.SET_SELECTED_ID:
            return {...state, designConfig: {...state.designConfig, selectedId: action.id}}
         case actionTypes.UPDATE_IMAGE:
          let shapeImage =  updateObjectInArray(state.designConfig.images, action)        
          return {...state, designConfig: {...state.designConfig, images: shapeImage}}
          case actionTypes.REMOVE_ITEM:
          let newDesignConfig  = removeItem(state.designConfig, action.id)   
           return {...state, designConfig: {...newDesignConfig}}
         case actionTypes.ADD_STICKER:
           return {...state, designConfig: {...state.designConfig, stickers: [...state.designConfig.stickers, action.payload]}}  
         case actionTypes.SET_STICKER_POSISTION:
            let i2 =  state.designConfig.stickers.findIndex(img => img.id === action.stickerId)
            action.index = i2;
            action.key = 'x'
            action.value = action.x 
            let newSticker=  updateObjectInArray(state.designConfig.stickers, action)
            action.key = 'y'
            action.value = action.y 
            let newSticker2=  updateObjectInArray(newSticker, action)
            return {...state, designConfig: {...state.designConfig, stickers: newSticker2}}
          case actionTypes.SET_STICKER_SCALE:
            let stickerIndex =  state.designConfig.stickers.findIndex(img => img.id === action.stickerId)
            action.index = stickerIndex;
            action.key = 'scale'
            let newStickerScaled=  updateObjectInArray(state.designConfig.stickers, action)
            return {...state, designConfig: {...state.designConfig, stickers: newStickerScaled}} 

           default: 
              return state 
        }
}

export default canvasReducer


function updateObjectInArray(array, action) {
    return array.map((item, index) => {
      if (index !== action.index) {
        // This isn't the item we care about - keep it as-is
        return item
      }
  
      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...{[action.key]: action.value}
      }
    })
  }

  function removeItem(config, id) {   
    config.texts = config.texts.filter(text => text.id !== id)
    config.shapes = config.shapes.filter(shape => shape.id !== id)
    config.images = config.images.filter(image => image.id !== id)
    config.drawings = config.drawings.filter(drawing => drawing.id !== id)
    config.stickers = config.stickers.filter(sticker => sticker.id !== id)
    return config
  }