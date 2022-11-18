import type { GetServerSidePropsContext, NextPage } from 'next';
import { Fragment } from 'react';
import Banner from '../components/home/Banner';
import Contact from '../components/home/Contact';
import Footer from '../components/home/Footer';
import Header from '../components/home/Header';
import Service from '../components/home/Service';
import { sessionOptions } from '../ultils/session';
import {withIronSessionSsr} from 'iron-session/next';

type ComponentPageType = {
  token: string
}

const Home: NextPage<ComponentPageType> = () => {
  return (
    <Fragment>
      <Header />
      <Banner />
      <Contact />
      <Service />
      <Footer />
    </Fragment>
  )
}

export default Home

export const getServerSideProps = withIronSessionSsr(async (context: GetServerSidePropsContext) => {
  console.log('token:', context.req.session.token )
  // context.req.session.token = 'D3UR0cK'; //passando um token para o nosso cokie
  await context.req.session.save(); // gravando token no nosso cokie
  return {
    props: {
      token: context.req.session.token? context.req.session.token: null,
    }
  }
}, sessionOptions);