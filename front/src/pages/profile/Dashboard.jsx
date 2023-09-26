import { useState } from "react"
import {FormInput, SubmitBtn} from "../../components"
import { inStorage, setInForm } from "../../lib"
import { Form } from "react-bootstrap"
import http from "../../http"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {setUser} from "../../store"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Order } from "./Order"
import { Review } from "./Review"
import { Profile } from "./Profile"
import { Password } from "./password"

export const Dashboard = () => {
    return <div className="col-12">
    <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
            <h2>User Dashboard</h2>
        </div>
    </div>

    <main className="row">
        <div className="col-lg-8 col-md-10 mx-auto bg-white py-3 mb-4">
        <Tabs
      defaultActiveKey="orders"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="orders" title={<><i className="fa-solid fa-gifts me-2"></i>Orders</>}>
        <Order/>
      </Tab>
      <Tab eventKey="reviews" title={<><i className="fa-solid fa-star me-2"></i>Reviews</>}>
        <Review/>
      </Tab>
      <Tab eventKey="profile" title={<><i className="fa-solid fa-user-edit me-2"></i>Edit Profile</>}>
        <Profile/>
      </Tab>
      <Tab eventKey="password" title={<><i className="fa-solid fa-asterisk me-2"></i>Change Password</>}>
        <Password/>
      </Tab>
    </Tabs>
        </div>

    </main>
</div>
}