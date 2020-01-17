
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
            <p>Created by
                <a href="https://www.ironwoods.es"
                    target="_blank"
                    rel="license author external">
                    © {props.author}
                </a>
                {props.year}. {props.licence} Licensed.
            </p>
            <p className="small-font">SVG icons from
                <a href="https://fontawesome.com/license"
                    target="_blank"
                    rel="nofollow noopener noreferrer license external">
                    © Font Awesome
                </a>
            </p>
        </footer>
    );
}

export default Footer;
