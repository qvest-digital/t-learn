import geb.spock.GebSpec
import groovyx.net.http.RESTClient

class E2ETestSpec extends GebSpec {

    def baseApiUrl = System.getenv('BACKEND_URL') ?: "https://t-force.lan.tarent.de"
    def resetDb() {
        def client = new RESTClient(baseApiUrl)
        def response = client.post(
                path: '/api_e2etest/reset',
                body: '',
                contentType: 'application/json'
        )
    }

    def setup() {
	to TLearnOverviewPage
    }

}
