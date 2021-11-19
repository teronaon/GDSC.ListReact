import React,{ useState } from "react";
import { Card, Modal, Button, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const MovieCard = ({ src, title, date, rating,id,overview,lang}) => {
    let url = "https://api.themoviedb.org/3/movie/"+id;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const notify = (type, msg) => {
        if (type = "success") {
            toast.success(msg, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        } else if(type = "info"){
            toast.info(msg, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        } else {
            toast("asdasdasd");
        }
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    const addWhitelist = () => {
        // console.log(getCookie("whitlist"))
        let dataObj = {
            "src": src,
            "title": title,
            "date": date,
            "rating": rating,
            "id": id,
            "overview": overview,
            "lang": lang
        };
        if (getCookie("wl") == "") {
            let cook1 = [dataObj]
            let cook1_str = JSON.stringify(cook1);
            setCookie("wl", cook1_str, 365);
            // alert("added to your pocket")
            notify("success", "added to your pocket");
        } else {
            const str_cook = getCookie("wl");
            let cook_json = JSON.parse(str_cook);
            //2
            if (!cook_json.some(cook => cook.id === dataObj.id)) {
                cook_json.push(dataObj);
                let cook_str = JSON.stringify(cook_json)
                setCookie("wl", cook_str, 365);
                notify("success", "added to your pocket");
            } else {
                toast.info("the movie is in yout pocket", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
            // cook_json.forEach(cook => {
            //     if (cook.id == id) {
            //         toast.info("the movie is in yout pocket", {
            //             position: toast.POSITION.BOTTOM_CENTER
            //         })
            //         return false;
            //     } else {
                    
            //     }
            // });
            // alert()
            
        }
    }
    return (
        <div>
            <Card>
                <Card.Img variant="top" src={src} alt="Movie Poster"/>
                <Card.Body>
                    <Card.Title>
                        <h5>{title}</h5>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{date} </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Rating : {rating} </Card.Subtitle>
                    <div className="d-flex justify-content-between">
                        <Button variant="outline-primary" onClick={handleShow}>See Details</Button>
                        <Button variant="outline-info" onClick={addWhitelist}>+ Whitlist</Button>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <img src={src} className="img-fluid" />
                        </Col>
                        <Col md={8}>
                            <ul className="list-group">
                                <li className="list-group-item"><h3>{title}</h3></li>
                                <li className="list-group-item">Released : {date}</li>
                                <li className="list-group-item">Language : {lang}</li>
                                <li className="list-group-item">Rating : {rating}</li>
                                <li className="list-group-item">Overview : {overview}</li>
                            </ul>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MovieCard;