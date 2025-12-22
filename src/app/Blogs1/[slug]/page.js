'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image'
import Header_new from '@/app/components/header_new'
import Footer from '@/app/components/footer'

export default function Blogsdetail({ params }) {
    const apiRoute = process.env.API_ROUTE2;  //base url
    const [blogdetail, setBlogdetail] = useState()  //blog detail variable
    const [loading, setLoading] = useState(true)
    const userId = 'IGM0000010'  //use id
    const BlogData = blogdetail?.description?.replace(/\*\*(.*?)\*\*/g, '<h3>$1</h3>').replace(/^(.*)$/gm, '<p>$1</p>');
    useEffect(
        () => {
            axios.get(`${apiRoute}/blogs/${params.slug}`, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    setBlogdetail(response.data)
                    // console.log(response)

                })
                .then(setLoading(false))
               // .then(console.log(blogdetail))
            //console.log(blogdetail)


            // const inputText = '[Read more ](https://m.sakshi.com/telugu-news/movies/monal-gajjar-accepted-green-india-challenge-plant-saplings-1340111)';
            // const regex = /\[Read more \]\(([^)]+)\)/;
            // const match = inputText.match(regex);
            // if (match) {
            //   const linkText = match[0];
            //   const url = match[1];
            //   const htmlText = `<a href="${url}">Read More</a>`;
            //   console.log(htmlText);
            // }


        }, [params.slug, apiRoute])

    //console.log(BlogData)


    return (
        <>

            <div className='header-wrap'>  <Header_new />  </div>
            <div className="desktop-div">

                <section className="project-detail-sec home-sec1">
                    <div className="container">
                        <div className="project-sec-cover">

                            {/* <Header_black />     */}




                            <div className="row">
                                <div className="col-md-12">
                                    <h1
                                      className="project-head"
                                      data-aos="fade-down"
                                      data-aos-easing="ease-in-sine"
                                      data-aos-duration="1500"
                                      data-aos-offset="100"
                                    >
                                      {blogdetail?.title}
                                    </h1>
                                </div>
                                <div className='col-md-1'></div>
                                <div className="col-md-10">
                                    <div className="home-banner-box">
                                        <Image src={blogdetail?.media[0].url} style={{ width: '100%' }} alt="Blog detail" fill />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="blog-detail-date" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1500" data-aos-offset="100">Published:- {`${new Date(blogdetail?.createdAt).getDate()}/${new Date(blogdetail?.createdAt).getMonth() + 1}/${new Date(blogdetail?.createdAt).getFullYear()}`}</div>
                                </div>

                                <div className="col-md-12">
                                    <div className="blog-detail-short-desc" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1500" data-aos-offset="100">
                                        {/* {blogdetail?.description} */}
                                        <div dangerouslySetInnerHTML={{ __html: BlogData }} />
                                    </div>


                                    {/* <div className="blog-detail-long-desc" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1500" data-aos-offset="100">
            {parse(`${blogdetail?.blog_detail}`)}
            </div> */}
                                </div>
                            </div>




                        </div>
                    </div>
                </section>


                <Footer />
            </div>

        </>
    )
}