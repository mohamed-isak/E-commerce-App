import React, {useState, useEffect, useRef} from 'react'
import { Row, Col} from 'react-bootstrap'
import { Button } from "primereact/button";
import { Slider } from 'primereact/slider';
import { OverlayPanel } from 'primereact/overlaypanel';
import { connect } from 'react-redux';
import { shapes } from '../../../shared/utils/constants';
import {COLORS} from '../../../shared/utils/constants'
import actionTypes from '../../../redux/design/actionTypes';

  const ShapeComponent = ({setShapes, pickedShapeId, shapesChoosen, addShape, updateShape, selectedShapes}) => {
    
   // const [selectedShapes, setSelectedShapes] = useState(shapesChoosen)
    const [shapeForEdit, setSelectedShapeForEdit] = useState(() =>undefined)
    const [editShapeEnable, setEditShapeEnable] = useState(false)
    const [shapeOutLine , setShapeOutLine] = useState(0)
    const [selectedShapeId, setSelectedShapeId] = useState(null)
    const [shapeOutLineColor, setShapeOutLineColor] = useState({id:1, name: 'white', color: '#FFFFFF'})
    const [shapeColor, setShapeColor] = useState({id:1, name: 'white', color: '#FFFFFF'})
    const [ shapeSize, setShapeSize] = useState(.5)
    const [ shapeRotation, setShapeRotation] = useState()
    const op = useRef(null);
    const op1 = useRef(null);

    const selectImageShape = (shape) => {
         addShape( {...shape, outline: shapeOutLine, color:shapeColor,outLineColor: shapeOutLineColor, shapeSize:shapeSize, shapeRotation:shapeRotation })
       // setSelectedShapes(preShapes => [...preShapes, {...shape, outline: shapeOutLine, color:shapeColor,outLineColor: shapeOutLineColor, shapeSize:shapeSize, shapeRotation:shapeRotation }])
        setSelectedShapeForEdit({...shape, outline: shapeOutLine, color:shapeColor,outLineColor: shapeOutLineColor, shapeSize:shapeSize, shapeRotation:shapeRotation })
      //  setShapes(preShapes => [...preShapes, {...shape, outline: shapeOutLine, color:shapeColor,outLineColor: shapeOutLineColor, shapeSize: shapeSize, shapeRotation:shapeRotation }])
     }

     const changeShapeOutLine = (e) => {
        setShapeOutLine(e.value)
        updateKeyForShape(e.value, 'outline')
     }

     
     const changeShapeSize = (e) => {
        setShapeSize(e.value)
        updateKeyForShape(e.value, 'shapeSize')
     }
     const changeShapeRotation = (e) => {
        setShapeRotation(e.value)
        updateKeyForShape(e.value, 'shapeRotation')
     }

     const chooseShapeColor = (color) => {
       setShapeColor(color)
       updateKeyForShape(color, 'color')
     }

     const chooseShapeOutLineColor = (color) => {
        setShapeOutLineColor(color)
        updateKeyForShape(color, 'outLineColor')
     }
     const updateKeyForShape = (value, key) => {
        console.log(selectedShapes)       
        if(selectedShapeId){
            let index =  selectedShapes.findIndex(shape => shape.id === selectedShapeId)
            selectedShapes[index][key] = value
            updateShape(index, key, value)
         } else if(selectedShapes.length) {       
            selectedShapes[selectedShapes.length-1][key] = value
            updateShape(selectedShapes.length-1, key, value)
         }

         console.log(selectedShapes)
        // updateShape(selectedShapes)
       //  setSelectedShapes(prevTexts => [...selectedShapes])  
        //  setShapes(prevTexts => [...selectedShapes])
          if(pickedShapeId)
          setSelectedShapeForEdit(selectedShapes.filter(shape => shape.id === pickedShapeId)[0])
    }
  

    useEffect(() => {
        console.log('reached', pickedShapeId)
        setSelectedShapeId(pickedShapeId) 
        console.log('reached -0',selectedShapes) 
        if(selectedShapes){
        console.log('reached -',selectedShapes.filter(shape => shape.id === pickedShapeId)  )    
        setSelectedShapeForEdit(selectedShapes.filter(shape => shape.id === pickedShapeId)[0])
        }
    }, [pickedShapeId])

    return (
       <>

        {!editShapeEnable && shapes.map(shape =>  
        {
        return <Col  key={shape.id} className={ (shapeForEdit &&  shapeForEdit.id === shape.id) ?  'shape-item selected' : "shape-item"} xs={2} > <div  className={'icn-container '+shape.name} onClick={() => selectImageShape(shape)} /> </Col>
        }
        ) }                         
        {!editShapeEnable && (shapeForEdit || selectedShapeId) && <Row className="edit-btn"> <Col xs={12} > <Button label="Edit" className="p-button-rounded tee-btn-success" onClick={() => setEditShapeEnable(true)}  /> </Col> </Row>}
        
        {editShapeEnable && <><Col xs={12}>
            <div className='edit-shape-item'> <div className={'icn-container '+shapeForEdit.name} /></div>
            </Col>
            <Col xs={12} className="input-row">
                <label>Shape Size</label> <span className="text-value">{shapeForEdit['shapeSize'] || shapeSize}</span>
                <Slider value={shapeForEdit['shapeSize'] || shapeSize} step={0.1} onChange={changeShapeSize} />
            </Col>
            <Col xs={12} className="input-row">
                <label>Rotation</label> <span className="text-value">{shapeForEdit['shapeRotation'] || shapeRotation}</span>
                <Slider value={shapeForEdit['shapeRotation'] ||  shapeRotation} min={1} onChange={changeShapeRotation} />
            </Col> 
            <Col xs={12} className="input-row">
                <label>Outline</label><span className="text-value">{shapeForEdit['shapeOutLine'] || shapeOutLine}</span>
                <Slider value={shapeForEdit['shapeOutLine'] || shapeOutLine} min={0}  onChange={changeShapeOutLine} />
            </Col>
            <Row className="input-row color-row">
        <Col xs={5.5} >
        <div><label>Shape Color</label></div>
        <div><label style={{ width: '6em'}}>{shapeColor.name}</label> <div className="xsm-box color-box" onClick={(e) => op.current.toggle(e)} style={{width: '20pt', backgroundColor: shapeForEdit['color'].color || shapeColor['color'].color}}></div></div>
        <OverlayPanel ref={op}  id="overlay_panel" style={{width: '120pt'}} className="overlaypanel-demo">                       
            {COLORS.map(color => {
                return <Row key={color.id}><Col xs={8} className='colr-label'>{color.name}</Col>
                <Col xs={4}> <div className={"color-box "+color.name} onClick={()=> chooseShapeColor(color)}> </div></Col> </Row>
            })}
        
    
        </OverlayPanel>
        </Col>
        <Col xs={5.5}>                         
        <div><label>Outline Color</label></div>
        <div><label style={{ width: '6em'}}>{shapeOutLineColor.name}</label> <div className="xsm-box color-box" onClick={(e) => op1.current.toggle(e)} style={{width: '20pt', backgroundColor: shapeForEdit['outLineColor'].color || shapeOutLineColor['color'].color}}></div></div>
        <OverlayPanel ref={op1}  id="overlay_panel" style={{width: '120pt'}} className="overlaypanel-demo">                       
            {COLORS.map(color => {
                return <Row key={color.id}><Col xs={8} className='colr-label'>{color.name}</Col>
                <Col xs={4}> <div className={"color-box "+color.name} onClick={()=> chooseShapeOutLineColor(color)}> </div></Col> </Row>
            })}                   
        </OverlayPanel>                         
            </Col> 
    
        </Row> 
            <Row className="edit-btn"> <Col xs={12} > <Button label="Back" className="p-button-rounded tee-btn-success" onClick={() => setEditShapeEnable(false)}  /> </Col> </Row>
            
            </>}

        </>
       
    )
}


function mapStateToProps(state) {
    return {      
        selectedShapes: state.canvas.present.designConfig.shapes
     }
  }

function mapDispatchToProps(dispatch) {
    return {
        addShape: (shape) => {
            dispatch({type: actionTypes.ADD_SHAPE, payload: shape})
        },
        updateShape: (index, key, value) => {
            dispatch({type: actionTypes.UPDATE_SHAPE, value, index, key})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShapeComponent)
