const sinon = require('sinon')

const firebase = require('firebase')

const apiConfig = require('../../../src/config/api-config')
const firebaseConfig = require('../../../src/config/firebase-config')
const firebaseClient = require('../../../src/client/firebase-client')

describe('[Unit] client/firebase-client', () => {
  describe('._createConnection', () => {
    let connection
    const stubFirestoreSettings = sinon.stub()
    const stubFirestore = sinon.fake.returns({ settings: stubFirestoreSettings })
    const stubInitializeApp = sinon.fake.returns({ firestore: stubFirestore })

    context('when runs in production', () => {
      before(() => {
        sinon.replace(firebase, 'initializeApp', stubInitializeApp)
        sinon.replace(apiConfig, 'isDev', false)
        connection = firebaseClient._createConnection()
      })

      after(() => {
        sinon.restore()
      })

      it('should instantiate Firebase App using custom config', () => {
        const calledCorrectly = stubInitializeApp.calledWith({
          apiKey: firebaseConfig.apiKey,
          projectId: firebaseConfig.projectId
        })
        expect(calledCorrectly).to.be.true
      })

      it('should NOT configure Firestore to local host', () => {
        expect(stubFirestoreSettings.notCalled).to.be.true
      })

      it('should returns a Firestore instance', () => {
        expect(connection).to.be.eql(stubFirestore.returnValues[0])
      })
    })

    context('when runs in development', () => {
      before(() => {
        sinon.replace(firebase, 'initializeApp', stubInitializeApp)
        sinon.replace(apiConfig, 'isDev', true)
        connection = firebaseClient._createConnection()
      })

      after(() => {
        sinon.restore()
      })

      it('should instantiate Firebase App using custom config', () => {
        const calledCorrectly = stubInitializeApp.calledWith({
          apiKey: firebaseConfig.apiKey,
          projectId: firebaseConfig.projectId
        })
        expect(calledCorrectly).to.be.true
      })

      it('should configure Firestore to local host using custom config', () => {
        const calledCorrectly = stubFirestoreSettings.calledWith({
          host: firebaseConfig.firestore.host,
          ssl: false
        })
        expect(calledCorrectly).to.be.true
      })

      it('should returns a Firestore instance', () => {
        expect(connection).to.be.eql(stubFirestore.returnValues[0])
      })
    })
  })
  describe('.connect', () => {
    let connection

    before(() => {
      const fakeFn = sinon.fake.returns({ projectId: firebaseConfig.projectId, terminate: sinon.stub() })
      sinon.replace(firebaseClient, '_createConnection', fakeFn)
      connection = firebaseClient.connect()
    })

    after(() => {
      firebaseClient.disconnect()
      sinon.restore()
    })

    it('should return a Firestore instance', () => {
      expect(connection).to.have.property('projectId', firebaseConfig.projectId)
    })

    it('should create raw connection only one time', () => {
      firebaseClient.connect()
      firebaseClient.connect()
      expect(firebaseClient._createConnection.calledOnce).to.be.true
    })
  })

  describe('.disconnect', () => {
    const spyTerminate = sinon.spy()

    before(() => {
      const fakeFn = sinon.fake.returns({ terminate: spyTerminate })
      sinon.replace(firebaseClient, '_createConnection', fakeFn)
      firebaseClient.connect()
      firebaseClient.disconnect()
    })

    after(() => {
      sinon.restore()
    })

    it('should close connection with Firestore', () => {
      expect(spyTerminate.called).to.be.true
    })
  })
})
