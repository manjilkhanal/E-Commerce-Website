import {  useEffect, useState } from "react"
import {Col, Container,Form, Row} from "react-bootstrap"
import { FormInput, Loading, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import http from "../../http"
import { useNavigate } from "react-router-dom"
import Switch from "react-switch"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
export const Create = () =>{
    const [form, setForm] = useState({status: true, featured: false})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [imgSelected, setImgSelected] = useState([])


    const navigate = useNavigate()

    useEffect(() =>{
        setLoadingPage(true)
        http.get('cms/categories')
        .then(({data}) => {
            setCategories(data)

            return http.get('cms/brands')
        })
        .then(({data}) => setBrands(data))
        .catch(err => {})
        .finally(() => setLoadingPage(false))
    },[])
    
    useEffect(() =>{
       if( 'images' in form && form.images.length){
            let temp = []

            for (let image of form.images){
                temp.push(<img src={URL.createObjectURL(image)} className="img-fluid mt-3 "/>)
            }
            setImgSelected(temp)
    }
        
    }, [form])

    const handleSubmit = ev =>{
        ev.preventDefault()
        setLoading(true)

        const fd = new FormData

        for(let key in form){
            if(key == 'images'){
                for(let image of form.images){
                    fd.append('images',image)
                }
            }else{
                fd.append(key,form[key])
            }
        }

        http.post('cms/products', fd,{
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
        .then(() => navigate('/products'))
        .catch(err => {})
        .finally(() => setLoading(false))

    }
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

    
    return <Container>
    <Row>
        <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                    <Row>
                        <Col lg={8} className="mx-auto">
                        <h1>Add Product</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8} className="mx-auto">
                            {loadingPage ? <Loading/> : <Form onSubmit={handleSubmit}>
                            <FormInput title="name" label="Name">
                            <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev,form,setForm)} defaultValue={form.name} required />
                            </FormInput>
                            
                            <FormInput title="summary" label="Summary">
                            <ReactQuill theme="snow" modules={modules} formats={formats} value={form.summary} onChange={data =>setForm({
                                ...form,
                                summary : data,
                            })}/>
                            </FormInput>
    
                            <FormInput title="description" label="Description">
                            <ReactQuill theme="snow" modules={modules} formats={formats} value={form.description} onChange={data =>setForm({
                                ...form,
                                description : data,
                            })}/>                            </FormInput>

                            <FormInput title="price" label="Price">
                            <Form.Control type="text" name="price" id="price" onChange={ev => setInForm(ev,form,setForm)} defaultValue={form.price} required />
                            </FormInput>

                            <FormInput title="discounted_price" label="Discounted Price">
                            <Form.Control type="text" name="discounted_price" id="discounted_price" onChange={ev => setInForm(ev,form,setForm)} defaultValue={form.discounted_price}  />
                            </FormInput>

                            <FormInput title="images" label="Images">
                            <Form.Control type="file" name="images" id="images" onChange={ev => setForm({
                                ...form,
                                images:ev.target.files
                            })}  accept="image/*" required multiple />
                                  {imgSelected.length ? <Row>
                                    {imgSelected.map(preview => <Col lg={4}>{preview}</Col>)}
                                  </Row> : null}  
                            </FormInput>
                            <FormInput title="category_id" label="Category">
                                <Form.Select name="category_id" id="category_id" onChange={ev => setInForm(ev, form, setForm)} required>
                                    <option value="">Select a Category</option>
                                    {categories.map(category =><option key={category._id} value={category._id}>{category.name}</option>)}
                                </Form.Select>
                            </FormInput>
                            <FormInput title="brand_id" label="Brand">
                                <Form.Select name="brand_id" id="brand_id" onChange={ev => setInForm(ev, form, setForm)} required>
                                    <option value="">Select a Brand</option>
                                    {brands.map(brand =><option key={brand._id} value={brand._id}>{brand.name}</option>)}
                                </Form.Select>
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
                            <FormInput title="featured" label="Featured">
                                <br/>
                                <Switch id="featured" checked={form.featured} onChange={() => {
                                    setForm({
                                        ...form,
                                        featured: !form.featured,

                                    })
                                }}/>
                            </FormInput>
                            
                            <div className="mb-3">
                                <SubmitBtn  loading={loading}/>
                            </div>
                        </Form>}
                        </Col>
                    </Row>
        </Col>
    </Row>
</Container>
}