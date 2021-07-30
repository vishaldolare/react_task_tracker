import PropTypes from 'prop-types';

const Button = ({onClick,color, text})=>{
    // const onClick = ()=>{
    //     console.log("Clicked function get called...!");
    // }
    return(
        <button onClick={onClick} style={{backgroundColor:color}} 
        className='btn'>{text}</button>
        )
}
Button.defaultProps = {
    color:'steelblue',
    text:'click'
}
Button.propTypes = {
  text: PropTypes.string,
  color:PropTypes.string,
  onClick:PropTypes.func.isRequired
}
export default Button;