import React from 'react'
import { Row, Col} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import {designs} from '../../../shared/utils/constants'
import {stickers} from '../../../shared/utils/constants'

import actionTypes from '../../../redux/design/actionTypes';
import { connect } from 'react-redux'

function ImageStickerComponent({stage, addStciker}) {

    const selectDesignImage = (stciker) => {
     addStciker({...stciker, id: uuidv4()})
    }
    return (
    stage === 'designIdeas' ? <Row className="design-item-container">
          {designs.map(design => {
              return <Col  key={design.id} className={"design-item"} xs={3} > <div  className={'design-icns-container '+design.name} onClick={() => selectDesignImage(design)} /> </Col>
          })}  
        </Row>
        :  stage === 'stickers' && <Row className="design-item-container">
         {stickers.map(sticker => {
             return <Col  key={sticker.id} className={"design-item"} xs={3} > <div  className={'design-icns-container '+sticker.name} onClick={() => selectDesignImage(sticker)} /> </Col>
         })}  
       </Row> 
    )
}

const mapDistpatchToProps = (dispatch) => {
    return {
        addStciker: (sticker) => dispatch({type: actionTypes.ADD_STICKER, payload: sticker})
    }
}

export default connect(null, mapDistpatchToProps)(ImageStickerComponent)