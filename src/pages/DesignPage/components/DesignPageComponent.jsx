import React from 'react'
import { Container } from 'react-bootstrap'
import './DesignPageComponent.scss'
import DesignHeaderComponent from './DesignHeaderComponent'
import DesignContainerComponent from './DesignContainerComponent'

export default function DesignPageComponent() {
    return (
        <>
            <DesignHeaderComponent />
            <DesignContainerComponent />
        </>
    )
}
