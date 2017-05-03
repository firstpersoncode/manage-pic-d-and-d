const request = require('supertest');
const axios = require('axios');
const {
  imageListInCanvas,
  fetchImagesToCanvas,
} = require('../client/src/component/Canvas/actions');


// ENDPOINT THAT WILL BE USED FOR DISPATCHING CANVAS'S STORE
const reports = {
  addImageToCanvasApiTest: {
    describe: 'endpoint for adding image to canvas',
    it: 'should receive object image from server and dispatch Canvas reducer'
  },
  addTextCanvasApiTest: {
    describe: 'endpoint for adding text to canvas',
    it: 'should receive object text from server'
  },
  fetchImageApiTest: {
    describe: 'endpoint for fetching image list in canvas from server',
    it: 'should response with list of image object in server'
  },
  routesForCanvas: {
    describe: 'REST API for canvas state',
    it: {
      add: 'should receive object image from server to be added into canvas',
      del: 'should remove object image that matched with id image list from server and receive response',
      txt: 'should receive object text from server'
    }
  }
};

// add image to canvas endpoint test
describe(reports.addImageToCanvasApiTest.describe, () => {
  it(reports.addImageToCanvasApiTest.it, () => {
    // check if server response and we receive data
    const testItem = { id: Date.now(), image: "http://localhost:7000/images/uploads-1462948498227.png" };
    const testAPI = () => {
      return axios.post('http://localhost:7000/canvas-state/text/', testItem)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        return err;
      })
    };
    // check if server response and we receive data
    expect(typeof testAPI()).toEqual('object');

    it('dispatch the action', () => {
      expect(imageListInCanvas(testItem)).toEqual({
        type: "ADD_IMAGE_TO_CANVAS",
        data: { id: Date.now(), image: "http://localhost:7000/images/uploads-1462948498227.png" }
      });
    })

    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.addImageToCanvasApiTest.describe);
    console.log('\nit: ' + reports.addImageToCanvasApiTest.it);
    console.log('\nresult: ' + JSON.stringify(testAPI()), 'action: ' + JSON.stringify(imageListInCanvas(testItem)));
    console.log('=========================================================================\n\n\n\n');
  });
});

// add text to canvas endpoint test
describe(reports.addTextCanvasApiTest.describe, () => {
  it(reports.addTextCanvasApiTest.it, () => {
    const testItem = { id: Date.now(), text: "test dummy" };
    const testAPI = () => {
      return axios.post('http://localhost:7000/canvas-state/text/', testItem)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        return err;
      })
    };
    // check if server response and we receive data
    expect(typeof testAPI()).toEqual('object');

    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.addTextCanvasApiTest.describe);
    console.log('\nit: ' + reports.addTextCanvasApiTest.it);
    console.log('\nresult: ' + JSON.stringify(testAPI()));
    console.log('=========================================================================\n\n\n\n');
  });
});

// fetch image from server
describe(reports.fetchImageApiTest.describe, () => {
  it(reports.fetchImageApiTest.it, () => {
    const testAPI = () => {
      return axios.get('http://localhost:7000/canvas-state/image/')
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        return err;
      })
    };
    // check if server response and we receive data
    expect(typeof testAPI()).toEqual('object');

    it('dispatch the action', () => {
      expect(fetchImagesToCanvas()).toEqual({
        type: "FETCH_CANVAS_STATE/images",
        data: [
          { id: Date.now(), image: "http://localhost:7000/images/uploads-1462948498227.png" },
          { id: Date.now(), image: "http://localhost:7000/images/uploads-1462948498227.png" }
        ]
      });
    })

    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.fetchImageApiTest.describe);
    console.log('\nit: ' + reports.fetchImageApiTest.it);
    console.log('\nresult: ' + JSON.stringify(testAPI()), 'action: ' + JSON.stringify(fetchImagesToCanvas()));
    console.log('=========================================================================\n\n\n\n');
  });
});



// server routes for managing sidepane state
describe(reports.routesForCanvas.describe, () => {
  let server;
  beforeEach(() => {
    server = require('../server', { bustCache: true });
  });
  afterEach((done) => {
    server.close(done);
  });

  // add image to canvas
  it(reports.routesForCanvas.it.add, (done) => {
    console.log('test POST canvas-state/image')
    request(server)
      .post('/canvas-state/image')
      .send({ id: Date.now(), image: "http://localhost:7000/images/uploads-1493813614798.jpg" })
      .expect("Content-type",/json/)
      .expect(200, done)
    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.routesForCanvas.describe);
    console.log('\nit: ' + reports.routesForCanvas.it.add);
    console.log('=========================================================================\n\n\n\n');
  });

  // test removing image from canvas
  it(reports.routesForCanvas.it.del, (done) => {
    console.log('test DELETE canvas-state/image')
    request(server)
      .delete('/canvas-state/image')
      .send({ id: Date.now() })
      .expect("Content-type",/json/)
      .expect(200, done)
    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.routesForCanvas.describe);
    console.log('\nit: ' + reports.routesForCanvas.it.del);
    console.log('=========================================================================\n\n\n\n');
  });

  // test add text to canvas
  it(reports.routesForCanvas.it.txt, (done) => {
    console.log('test DELETE canvas-state/text')
    request(server)
      .post('/canvas-state/text')
      .send({ id: Date.now(), text: "Lorem Ipsum" })
      .expect("Content-type",/json/)
      .expect(200, done)
    // Log report
    console.log('==========================================================================');
    console.log('\ndescribe: ' + reports.routesForCanvas.describe);
    console.log('\nit: ' + reports.routesForCanvas.it.txt);
    console.log('=========================================================================\n\n\n\n');
  });


});
