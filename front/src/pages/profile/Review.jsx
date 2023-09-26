import { useEffect, useState } from "react"
import http from "../../http"
import { DataTable, Loading } from "../../components"
import moment from "moment"

export const Review = () =>{
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        setLoading(true)
        http.get('profile/reviews')
            .then(({data}) => setReviews(data))
            .catch(err =>{})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading/> : <DataTable searchable={['Created At','Updated At','Product','Comment','Rating']} sortable={['Created At','Updated At','Product','Comment','Rating']} data={reviews.map(review =>{
        return{
            'Product': review.product.name,
            'Comment': review.comment,
            'Rating': <>{review.rating}<i className="fa-solid fa-star ms-2"></i></>,
            'Created At': moment(review.createdAt).format('llll'),
            'Updated At': moment(review.updatedAt).format('llll'),
        }
    })} />
}