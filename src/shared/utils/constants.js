import { v4 as uuidv4 } from 'uuid'
 
 
//  import doubleSquare  from '../../assets/images/design/shapes/shape-1.svg'
//  import triangle  from '../../assets/images/design/shapes/shape-2.svg'
//  import ring  from '../../assets/images/design/shapes/shape-3.svg'
//  import circle  from '../../assets/images/design/shapes/shape-4.svg'
//  import square  from '../../assets/images/design/shapes/shape-5.svg'
//  import starightStar  from '../../assets/images/design/shapes/shape-6.svg'
//  import star  from '../../assets/images/design/shapes/shape-7.svg'
//  import polygon  from '../../assets/images/design/shapes/shape-8.svg'
//  import curly  from '../../assets/images/design/shapes/shape-9.svg'
//  import cloud  from '../../assets/images/design/shapes/shape-10.svg'
//  import soap  from '../../assets/images/design/shapes/shape-11.svg'
//  import newStar  from '../../assets/images/design/shapes/shape-12.svg'
//  import halfCircle  from '../../assets/images/design/shapes/shape-13.svg'
//  import love from '../../assets/images/design/shapes/shape-14.svg'
//  import halfTraiangle  from '../../assets/images/design/shapes/shape-15.svg'
//  import parllel  from '../../assets/images/design/shapes/shape-16.svg'
//  import curlyCircle  from '../../assets/images/design/shapes/shape-17.svg'
//  import poly  from '../../assets/images/design/shapes/shape-18.svg'
//  import newCurly  from '../../assets/images/design/shapes/shape-19.svg'
//  import arrow  from '../../assets/images/design/shapes/shape-20.svg'
//  import squareBend  from '../../assets/images/design/shapes/shape-21.svg'
//  import zigzag  from '../../assets/images/design/shapes/shape-22.svg'
//  import twoTraingle  from '../../assets/images/design/shapes/shape-23.svg'
//  import bend  from '../../assets/images/design/shapes/shape-24.svg'
//import { Ring } from 'react-konva'

import sticker1  from '../../assets/images/design/stickers/sticker-1.svg'
import sticker2  from '../../assets/images/design/stickers/sticker-2.svg'
import sticker3  from '../../assets/images/design/stickers/sticker-3.svg'
import sticker4  from '../../assets/images/design/stickers/sticker-4.svg'
import sticker5  from '../../assets/images/design/stickers/sticker-5.svg'
import sticker6  from '../../assets/images/design/stickers/sticker-6.svg'
import sticker7  from '../../assets/images/design/stickers/sticker-7.svg'
import sticker8  from '../../assets/images/design/stickers/sticker-8.svg'
import sticker9  from '../../assets/images/design/stickers/sticker-9.svg'
import sticker10  from '../../assets/images/design/stickers/sticker-10.svg'
import sticker11  from '../../assets/images/design/stickers/sticker-11.svg'
import sticker12  from '../../assets/images/design/stickers/sticker-12.svg'

import idea1  from '../../assets/images/design/ideas/idea-1.svg'
import idea2  from '../../assets/images/design/ideas/idea-2.svg'
import idea3  from '../../assets/images/design/ideas/idea-3.svg'
import idea4  from '../../assets/images/design/ideas/idea-4.svg'
import idea5  from '../../assets/images/design/ideas/idea-5.svg'
import idea6  from '../../assets/images/design/ideas/idea-6.svg'
import idea7  from '../../assets/images/design/ideas/idea-7.svg'
import idea8  from '../../assets/images/design/ideas/idea-8.svg'
import idea9  from '../../assets/images/design/ideas/idea-9.svg'
import idea10  from '../../assets/images/design/ideas/idea-10.svg'
import idea11  from '../../assets/images/design/ideas/idea-11.svg'
import idea12  from '../../assets/images/design/ideas/idea-12.svg'

//  export const shapes = [
//      {id:uuidv4(), name: doubleSquare},
//      {id:uuidv4(), name: triangle},
//      {id:uuidv4(), name: doublecircle},
//      {id:uuidv4(), name: circle},
//      {id:uuidv4(), name: square},
//      {id:uuidv4(), name: starightStar},
//      {id:uuidv4(), name: star},
//      {id:uuidv4(), name: polygon},
//      {id:uuidv4(), name: curly},
//      {id:uuidv4(), name: cloud},
//      {id:uuidv4(), name: soap},
//      {id:uuidv4(), name: newStar},
//      {id:uuidv4(), name: halfCircle},
//      {id:uuidv4(), name: love},
//      {id:uuidv4(), name: halfTraiangle},
//      {id:uuidv4(), name: parllel},
//      {id:uuidv4(), name: curlyCircle},
//      {id:uuidv4(), name: poly},
//      {id:uuidv4(), name: newCurly},
//      {id:uuidv4(), name: arrow},
//      {id:uuidv4(), name: squareBend},
//      {id:uuidv4(), name: zigzag},
//      {id:uuidv4(), name: twoTraingle},
//      {id:uuidv4(), name: bend}
//  ]




 export const shapes = [
    {id:uuidv4(), name: 'triangle', path: 'M150 0 L75 200 L225 200 Z' },
    {id:uuidv4(), name: 'ring' },
    {id:uuidv4(), name: 'circle'},
    {id:uuidv4(), name: 'square'},
    {id:uuidv4(), name: 'star'},
    {id:uuidv4(), name: 'polygon'},
    {id:uuidv4(), name: 'ellipse'},
    {id:uuidv4(), name: 'arrow'},
  //  {id:uuidv4(), name: 'halfCircle'}
]


export  const COLORS = [{id:1, name: 'white', color: '#FFFFFF'},
{id:2, name: 'black', color: '#000000'},
{id:3, name: 'grey', color: '#9B9B9B'},
{id:4, name: 'blue', color: '#0089FF'},
{id:5, name: 'red', color: '#F4152A'},
{id:6, name: 'yellow', color: '#FFB500'},
{id:7, name: 'gold', color: '#FFC728'},
{id:8, name: 'orange', color: '#FF8200'},
{id:9, name: ' green', color: '#00BF89'},
{id:10, name: 'olive-green', color: '#6B8329'},
{id:11, name: 'purpile', color: '#AE48F5'}]

export const designs = [
  {id:1,name: 'idea-1', icn: idea1},
  {id:2,name: 'idea-2', icn: idea2},
  {id:3,name: 'idea-3', icn: idea3},
  {id:4,name: 'idea-4', icn: idea4},
  {id:5,name: 'idea-5', icn: idea5},
  {id:6,name: 'idea-6', icn: idea6},
  {id:7,name: 'idea-7', icn: idea7},
  {id:8,name: 'idea-8', icn: idea8},
  {id:9,name: 'idea-9', icn: idea9},
  {id:10,name: 'idea-10', icn: idea10},
  {id:11,name: 'idea-11', icn: idea11},
  {id:12,name: 'idea-12', icn: idea12}
]

export const stickers = [
  {id:1,name: 'sticker-1', icn: sticker1},
  {id:2,name: 'sticker-2', icn: sticker2},
  {id:3,name: 'sticker-3', icn: sticker3},
  {id:4,name: 'sticker-4', icn: sticker4},
  {id:5,name: 'sticker-5', icn: sticker5},
  {id:6,name: 'sticker-6', icn: sticker6},
  {id:7,name: 'sticker-7', icn: sticker7},
  {id:8,name: 'sticker-8', icn: sticker8},
  {id:9,name: 'sticker-9', icn: sticker9},
  {id:10,name: 'sticker-10', icn: sticker10},
  {id:11,name: 'sticker-11', icn: sticker11},
  {id:12,name: 'sticker-12', icn: sticker12}
]