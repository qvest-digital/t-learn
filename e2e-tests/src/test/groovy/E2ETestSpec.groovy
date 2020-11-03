import geb.spock.GebSpec
import org.testcontainers.containers.DockerComposeContainer
import org.testcontainers.spock.Testcontainers
import spock.lang.Shared

@Testcontainers
class E2ETestSpec extends GebSpec {

    private static final String serviceName = 'app-backend'
    private static final int servicePort = 8080

    DockerComposeContainer application = new DockerComposeContainer(new File('./e2e-docker-compose.yml'))
            .withExposedService(serviceName, servicePort)
            .withLocalCompose(true);

    String getContainerUrl() {
        def host = application.getServiceHost(serviceName, servicePort)
        def port = application.getServicePort(serviceName, servicePort)
        return "http://$host:$port"
    }

    def setup() {
        TLearnOverviewPage.url = getContainerUrl()
        to TLearnOverviewPage
    }
}
