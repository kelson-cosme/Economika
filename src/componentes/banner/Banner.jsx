import banner1 from "../../assets/banner1.png"
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';

import "./Banner.css"

const banners = [
    {id: "1", image: banner1},
    {id: "2", image: banner1},
    {id: "3", image: banner1},
    {id: "4", image: banner1},
    {id: "5", image: banner1}

]

function Banner(){
    return(
        <>  
           {banners.length > 0 ? (
                    <Swiper slidesPerView={1} pagination={{ clickable:true }} >
                        {banners.map( (doc, key) => (
                                <SwiperSlide key={doc.id}>
                                <div className='bannerPrincipal' key={key}>

                                        <div className='imagemTamanho'>
                                            <img src={doc.image} alt="" />
                                        </div>
                                </div>
                                </SwiperSlide>
                                )
                            )
                        }
                    </Swiper>
                ) : (
                    <p>Carregando produtos...</p>
                )}

        </>
    )
}

export default Banner