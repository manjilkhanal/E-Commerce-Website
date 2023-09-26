import { useEffect,useState } from "react";
import { Button, Col, Container, Row} from "react-bootstrap"
import http from "../../http"
import { DataTable, Loading } from "../../components";
import { confirmAlert} from "react-confirm-alert"
import moment from "moment"
export const List = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    

    useEffect(() =>{
        setLoading(true)

        http.get('cms/reviews')
        .then(({data}) => setReviews(data))
        .catch(err => {})
        .finally(() => setLoading(false))
    }, [])

    const handleDelete = id =>{
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Sure',
                    onClick: () => {
                        setLoading(true)

                        http.delete(`cms/reviews/${id}`)
                            .then(() => http.get('cms/reviews'))
                            .then(({data}) => setReviews(data))
                            .catch(err =>{})
                            .finally(() => setLoading(false))
                    }
                },
                {
                    label: 'Abort',
                    onClick: () =>{}
                }

            ]
        })
    }
    return <Container>
        <Row>
            <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Reviews</h1>
                    </Col>
                </Row>
                {loading ? <Loading/> : <Row>
                    <Col>
                    <DataTable searchable={['Created At','Updated At','Product','Comment','Rating','Customer']} sortable={['Created At','Updated At','Product','Comment','Rating','Customer']} data={reviews.map(review =>{
        return{
            'Customer': review.user.name,
            'Product': review.product.name,
            'Comment': review.comment,
            'Rating': <>{review.rating}<i className="fa-solid fa-star ms-2"></i></>,
            'Created At': moment(review.createdAt).format('llll'),
            'Updated At': moment(review.updatedAt).format('llll'),
            'Actions': <Button variant="outline-danger" size="sm" onClick={() => handleDelete(review._id)}>
            <i className="fa-solid fa-trash me-2"></i>Delete
        </Button>
        }
    })} />
                    </Col>    
                </Row>}
            </Col>
        </Row>
    </Container>
    {/*  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(review._id)}>
                                    <i className="fa-solid fa-trash me-2"></i>Delete
                                </Button> */}
}