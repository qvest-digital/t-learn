import geb.spock.GebSpec
import groovyx.net.http.RESTClient
import org.testcontainers.spock.Testcontainers
import org.testcontainers.containers.PostgreSQLContainer

@Testcontainers
class E2ETestSpec extends GebSpec {

  def db = new PostgreSQLContainer("postgres:13.0")
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
