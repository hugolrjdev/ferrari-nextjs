import { NextPage } from "next";
import { Fragment } from "react";
import Contact from "../../components/home/Contact";
import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";


const ContactPage:NextPage = () => {
    return (
        <Fragment>
            <Header/>
            <Contact/>
            <Footer/>
        </Fragment>
    )
}

export default ContactPage;


