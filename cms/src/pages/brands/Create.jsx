import {  useState } from "react"
import {Col, Container,Form, Row} from "react-bootstrap"
import { FormInput, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import http from "../../http"
import { useNavigate } from "react-router-dom"
import Switch from "react-switch"

export const Create = () =>{
    const [form, setForm] = useState({status: true})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    
    const handleSubmit = ev =>{
        ev.preventDefault()
        setLoading(true)

        http.post('cms/brands', form)
        .then(() => navigate('/brands'))
        .catch(err => {})
        .finally(() => setLoading(false))

    }
    
    return <Container>
    <Row>
        <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                    <Row>
                        <Col lg={6} className="mx-auto">
                        <h1>Add Brand</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="mx-auto">
                        <Form onSubmit={handleSubmit}>
                            <FormInput title="name" label="Name">
                            <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev,form,setForm)} defaultValue={form.name} required />
                            </FormInput>
                            
                            <FormInput title="status" label="Status">
                                <br/>
                                <Switch id="status" checked={form.status} onChange={() => {
                                    setForm({
                                        ...form,
                                        status: !form.status,

                                    })
                                }}/>
                            </FormInput>
                            
                            <div className="mb-3">
                                <SubmitBtn  loading={loading}/>
                            </div>
                        </Form>
                        </Col>
                    </Row>
        </Col>
    </Row>
</Container>
}