import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import PostCreateView from '../components/PostCreateView/PostCreateView';
import React from 'react';
import expectJSX from 'expect-jsx';
import { Link } from 'react-router';

expect.extend(expectJSX);

describe('component tests', () => {

  it('should render PostCreateView properly', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<PostCreateView showAddPost={false} addPost={function noop() {}}/>);

    const output = renderer.getRenderOutput();
    expect(output).toEqualJSX(
      <div className="form ">
        <div className="form-content">
          <h2 className="form-title">Create new post</h2>
          <input placeholder="Author's Name" className="form-field" ref="name"/>
          <input placeholder="Post Title" className="form-field" ref="title"/>
          <textarea placeholder="Post Content" className="form-field" ref="content"></textarea>
          <a className="post-submit-button align-right" href="#" onClick={function noop() {}}>Submit</a>
        </div>
      </div>
    );
  });

  it('should show post create form in  PostCreateView if showAddPost is true', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<PostCreateView showAddPost addPost={function noop() {}}/>);

    const output = renderer.getRenderOutput();
    expect(output).toEqualJSX(
      <div className="form appear">
        <div className="form-content">
          <h2 className="form-title">Create new post</h2>
          <input placeholder="Author's Name" className="form-field" ref="name"/>
          <input placeholder="Post Title" className="form-field" ref="title"/>
          <textarea placeholder="Post Content" className="form-field" ref="content"></textarea>
          <a className="post-submit-button align-right" href="#" onClick={function noop() {}}>Submit</a>
        </div>
      </div>
    );
  });
});
