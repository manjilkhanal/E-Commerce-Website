import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import http from "../../http"
import { Col, Row,Form } from "react-bootstrap"
import { setUser } from "../../store"
import { FormInput, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
export const Profile = () =>{
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    useEffect(() =>{
        if(Object.keys(user).length){
            setForm({
                name: user.name,
                phone: user.phone,
                address: user.address,
            })
        }
    },[user] )
    
    const handleSubmit = ev =>{
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/edit-profile', form)
        .then(() => http.get('profile/details'))
        .then(({data}) => dispatch(setUser(data)))
        .catch(err => {})
        .finally(() => setLoading(false))

    }
    return <Row>
        <Col lg={6} className="mx-auto">
                        <Form onSubmit={handleSubmit}>
                            <FormInput title="name" label="Name">
                            <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev,form,setForm)} defaultValue={form.name} required />
                            </FormInput>
                            <FormInput title="email" label="Email">
                            <Form.Control type="text" defaultValue={user.email} plaintext readOnly />
                            </FormInput>
                            <FormInput title="phone" label="Phone">
                            <Form.Control type="text" name="phone" id="phone" onChange={ev => setInForm(ev,form,setForm)} defaultValue={form.phone} required />
                            </FormInput>
                            <FormInput title="address" label="Address">
                            <Form.Control as="textarea" name="address" id="address" onChange={ev => setInForm(ev,form,setForm)} defaultValue={form.address} required />
                            </FormInput>
                            
                            <div className="mb-3">
                                <SubmitBtn label="Save" icon="fa-save" loading={loading}/>
                            </div>
                        </Form>
                        </Col>
    </Row>
}