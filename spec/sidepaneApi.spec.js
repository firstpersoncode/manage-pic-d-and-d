const request = require('supertest');
const axios = require('axios');
const {
  uploadImage,
  imageList
} = require('../client/src/component/SidePane/actions');

// ENDPOINT THAT WILL BE USED FOR DISPATCHING SIDEPANE'S STORE
const reports = {
  uploadImageApiTest: {
    describe: 'endpoint for upload image to server',
    it: 'should get response from server with uploaded object image'
  },
  fetchImageListApiTest: {
    describe: 'endpoint for fetching image list from server',
    it: 'should receive object image list from server'
  },
  routesForSidePane: {
    describe: "test REST API for sidepane state",
    it: {
      del: "delete image using /images route with parameter delete",
      up: 'upload file to server',
      else: 'status should be 404'
    }
  }
};

// test endpoint for upload data
describe(reports.uploadImageApiTest.describe, () => {
  it(reports.uploadImageApiTest.it, () => {
    const testFile = {
      lastModified: 1493082447939,
      lastModifiedDate: (new Date()),
      name: "javascriptlogo-2.jpg",
      size: 25449,
      type: "image/jpeg",
      webkitRelativePath: ""
    };

    // let form = new FormData();
    // form.append('upload', testFile);

    const testAPI = () => {
      return axios.post('http://localhost:7000/uploads/', { FormData: { upload: testFile } })
      .then(({ data }) => {
        return data
      })
      .catch((error) => {
        return error
      });
    }

    // check if server response and we receive data
    expect(typeof testAPI()).toEqual('object');

    it('dispatch the action', () => {
      const action = uploadImage({ file: "http://localhost:7000/images/uploads-1493813614798.jpg" });
      expect(action).toEqual({
        type: 'UPLOAD_IMAGE_ASSETS',
        data: { file: "http://localhost:7000/images/uploads-1493813614798.jpg" },
      })
    });

    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.uploadImageApiTest.describe);
    console.log('\nit: ' + reports.uploadImageApiTest.it);
    console.log('\nresult: ' + JSON.stringify(testAPI()), 'action: ' + JSON.stringify(uploadImage({ file: "http://localhost:7000/images/uploads-1493813614798.jpg" })));
    console.log('=========================================================================\n\n\n\n');
  });
})


// test endpoint for fetch data
describe(reports.fetchImageListApiTest.describe, () => {
  it(reports.fetchImageListApiTest.it, () => {

    const testAPI = () => {
      return axios.get('http://localhost:7000/images/')
      .then(({ data }) => {
        return data
      })
      .catch((error) => {
        return error
      });
    }

    // check if server response and we receive data
    expect(typeof testAPI()).toEqual('object');

    const fakeResponse = [
      "http://test/images.png",
      "http://test/images.png",
      "http://test/images.png",
    ];

    it('dispatch the action', () => {
      const action = imageList(fakeResponse);
      expect(action).toEqual({ // dispatch and update reducer's state
        type: 'FETCH_IMAGE_ASSETS',
        data: fakeResponse,
      })
    });

    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.fetchImageListApiTest.describe);
    console.log('\nit: ' + reports.fetchImageListApiTest.it);
    console.log('\nresult: ' + JSON.stringify(testAPI()), 'action: ' + JSON.stringify(imageList(fakeResponse)));
    console.log('=========================================================================\n\n\n\n');
  });
})


// server routes for managing sidepane state
describe(reports.routesForSidePane.describe, () => {
  let server;
  beforeEach(() => {
    server = require('../server', { bustCache: true });
  });
  afterEach((done) => {
    server.close(done);
  });

  // deleting image
  it(reports.routesForSidePane.it.del, (done) => {
    console.log('test DELETE /images')
    request(server)
      .delete('/images')
      .send({ delete: "http://localhost:7000/images/uploads-1493813614798.jpg" })
      .expect("Content-type",/json/)
      .expect(200, done)
    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.routesForSidePane.describe);
    console.log('\nit: ' + reports.routesForSidePane.it.del);
    console.log('=========================================================================\n\n\n\n');
  });

  // test for upload new image
  it(reports.routesForSidePane.it.up, (done) => {
    console.log('test POST /images')
    request(server)
      .post('/images')
      .send({ upload: "uploads-1493813614798.jpg" })
      .expect("Content-type",/json/)
      .expect(200, done)
    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.routesForSidePane.describe);
    console.log('\nit: ' + reports.routesForSidePane.it.up);
    console.log('=========================================================================\n\n\n\n');
  });


  // test for 404 handler
  it(reports.routesForSidePane.it.else, (done) => {
    console.log('test 404')
    request(server)
      .get('/foo/bar')
      .expect(404, done);
    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.routesForSidePane.describe);
    console.log('\nit: ' + reports.routesForSidePane.it.else);
    console.log('=========================================================================\n\n\n\n');
  });

});
