
import './footer.scss';
import React from 'react';

function Footer(props)
{
    const longText = (props.text)
        ? <p>{props.text}</p>
        : "";

    return (
        <footer>
            {longText}
            <p>Created by <a href="https://www.ironwoods.es" target="_blank">© {props.author}</a> {props.year}. {props.licence} Licensed.</p>
            <p class="small-font">SVG icons from <a href="https://fontawesome.com/license" target="_blank" rel="no-follow">© Font Awesome</a></p>
        </footer>
    );
}

export default Footer;
