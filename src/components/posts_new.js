import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ""}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ""}
                </div>
            </div>
        )
    }

    onSubmit(values) {

        this.props.createPost(values, () => {
            this.props.history.push('/')
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/' className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    //console.log(values) -> { title: 'asdf', categories: 'asdfasdf', content: "content goes here"}
    const errors = {};
    //Validate the inputs from 'values'
    if (!values.title || values.title.length < 3) {
        errors.title = "Please enter a title greater than three characters";
    }
    if (!values.categories) {
        errors.categories = "Please enter a category"
    }
    if (!values.content) {
        errors.content = "Please enter some content"
    }
    //if errors is empty, the form is fine to submit
    //if errors has any properties, redux form assumes form is invalid
    return errors;

}

export default reduxForm({
    validate,
    //validate: validate, <- above is the same as this 
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);  