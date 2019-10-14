import React, { Component } from "react";
import axios from "axios";
import {Formik,Form,Field} from "formik";

class EditProject extends Component{
    constructor(props){
        super(props);
        this.state ={project:[] , projectName: "",
        projecDescription: ""};
      
   
        this.handleChangename=this.handleChangename.bind(this);
        this.handleChangedescription=this.handleChangedescription.bind(this);
        
        this.routeListProject= this.routeListProject.bind(this);
        this.onsubmits=this.onsubmits.bind(this);

    }

    componentDidMount(){
      axios.get("http://localhost:8083/test/api/v1/project")
      .then(result=>{
        result.data.map(res=>{
          if(res.id==this.props.match.params.id){
            this.setState({
              projectName:res.projectName,
              projecDescription:res.projectDescription
            })
          }
        })
      }        )

        // axios
        // .get(
        //   "http://localhost:8083/test/api/v1/project/id" +this.props.match.params.id
        // )
        // .then(result=>{
        //     console.log(result);
        //     this.setState({
        //        id:result.data.id,
        //         projectName:result.data.projectName,
        //         projecDescription:result.data.projecDescription
        //     });
        // });
       
    }

    //GeT ID Method

    handleChangename(f){
        this.setState({
            projectName:f.target.value
        });
        console.log(this.state.pr)
    }

    handleChangedescription(g){
        this.setState({
            projecDescription:g.target.value
        });
    }

    onsubmits(e){
        e.preventDefault();

        const update={
            projectName:this.state.projectName,
            projectDescription:this.state.projecDescription
        };

        axios.put(`http://localhost:8083/test/api/v1/project/${this.props.match.params.id}`, update).then(res => {
          console.log(res)
            if (res.status === 204) {
              alert("Project update successfully.");
              this.routeListProject();
            }
          });

      
    }

    routeListProject(){
        let path='/';
        this.props.history.push(path);
    }

    render() {
     
        return (
          <div className="col-sm-12">
            <div className="container">
              <br />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.routeListProject}
              >
                <i className="fa fa-arrow-circle-left  "> Back</i>
              </button>
              <h3 align="center">Edit Project</h3>
            </div>
    
            <Formik>
              <Form className="container" onSubmit={this.onsubmits}>
                {/* <fieldset>
                  <label>Project Id</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="id"
                    value={this.state.id}
                    onChange={this.handleChangeid}
                    placeholder="Project Id Here"
                    disabled
                  />
                </fieldset> */}
                <fieldset className="form-group">
                  <label> ProjectName</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="projectname"
                    value={this.state.projectName}
                    onChange={this.handleChangename}
                    placeholder="Project Name Here"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label> ProjectDescription</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="projectdescr"
                    value={this.state.projecDescription}
                    onChange={this.handleChangedescription}
                    placeholder="Project Describtion here"
                  />
                </fieldset>
                <button
                  className="btn btn-success"
                  value="Submit"
                  type="submit"
                  align="center"
                >
                  <i className="fa fa-plus"> Update</i>
                </button>
                &nbsp;
                <button
                  className="btn btn-danger"
                  type="reset"
                  onClick={this.routeListProject}
                  align="center"
                >
                  <i className="fa fa-location-arrow"> cancel</i>
                </button>
                <br />
                &nbsp; &nbsp; &nbsp;
              </Form>
            </Formik>
          </div>
        );
      }
}

export default EditProject;