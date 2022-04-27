import React, {useState, useRef} from 'react'
import { Row, Col} from 'react-bootstrap'
import { Button } from "primereact/button";
import { Slider } from 'primereact/slider'
import { BsPencil } from "react-icons/bs";
import { OverlayPanel } from 'primereact/overlaypanel';
import {COLORS} from '../../../shared/utils/constants'
import { connect } from 'react-redux'
import actionTypes from '../../../redux/design/actionTypes';


 function DrawingComponent({makeConfig, setDrawingConfig}) {

    const [brushSize, setBrushSize] = useState(1)
    const [drawColor , setDrawColor] = useState({id:1, name: 'white', color: '#FFFFFF'})
   const [drawConfig, setDrawConfig] = useState({color: drawColor.color, tool: 'pen' })
    const [tool , setTool] = useState('pen')
    const op = useRef(null);
   const changeBrushSize = (value) => {
       setBrushSize(value)
    }
    const chooseDrawColor = (value)  => {
        setDrawColor(value)
       // setConfig('color', color)
       setDrawingConfig({...drawConfig, color:value.color} )
    }
    const selectTool = (tool) => {
        setTool(tool)
        //setConfig('tool', tool)
        setDrawingConfig({...drawConfig, tool:tool} )
    }

    const setConfig = (key, value) => {
        setDrawConfig(preConfig => {
            return  {...preConfig, [key]: value }})
            setDrawingConfig(drawConfig)
            
        makeConfig({...drawConfig, [key]: value })
    }

    return (
        <>
        {/* <Col xs={12}  className="input-row">
           <div> <label>Brushes</label></div>
           <Col xs={4} className="dr-brush"><div className="sm-box brush-cn-1">  </div></Col> 
           <Col xs={4} className="dr-brush"><div className="sm-box brush-cn-2">  </div></Col> 
           <Col xs={4} className="dr-brush"><div className="sm-box brush-cn-3">  </div></Col> 
            
        </Col> 
        <Col xs={12} className="input-row">
                <label>Brush size</label> <span className="text-value">{brushSize}</span>
                <Slider value={brushSize} min={1} onChange={(e) => changeBrushSize(e.value)} />
        </Col>*/}
        <Row className="input-row color-row">
        <Col xs={5.5}  >
        <div><label>Color</label></div>
        <div><label style={{ width: '6em'}}>{drawColor.name}</label> <div className="xsm-box color-box" onClick={(e) => op.current.toggle(e)} style={{width: '20pt', backgroundColor: drawColor.color}}></div></div>
        <OverlayPanel ref={op}  id="overlay_panel" style={{width: '120pt'}} className="overlaypanel-demo">                       
            {COLORS.map(color => {
                return <Row key={color.id}><Col xs={8} className='colr-label'>{color.name}</Col>
                <Col xs={4}> <div className={"color-box "+color.name} onClick={()=> chooseDrawColor(color)}> </div></Col> </Row>
            })}
        </OverlayPanel>
        </Col>
        <Col xs={2}>
        <div><label>Pencil</label></div>
        <div className="sm-box pencil-icon" onClick={() => selectTool('pen')} ><BsPencil /></div>
        </Col>
        {/* <Col xs={2}>
        <div><label>Eraser</label></div>
        <div className="sm-box eraser-icon"  onClick={() => selectTool('eraser')}> </div>
        </Col> */}
        </Row>
        </>
    )
}


function mapStateToProps(state) {
    return {      
        selectedDrawings: state.canvas.present.designConfig.drawings
     }
  }

function mapDispatchToProps(dispatch) {
    return {
        setDrawingConfig: (config) => {
            dispatch({type: actionTypes.SET_DRAW_CONFIG, payload: config})
        },
        updateShape: (index, key, value) => {
            dispatch({type: actionTypes.UPDATE_SHAPE, value, index, key})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DrawingComponent) 