/*
	This is the Geb configuration file.
	
	See: http://www.gebish.org/manual/current/#configuration
*/


import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxOptions

waiting {
	timeout = 10
	retryInterval = 2
}

environments {
	
	// run via “./gradlew chromeTest”
	// See: http://code.google.com/p/selenium/wiki/ChromeDriver
	chrome {
		driver = {
			ChromeOptions o = new ChromeOptions()
			o.addArguments("--window-size=1920,1080")
			new ChromeDriver(o)
		}
	}

	// run via “./gradlew chromeHeadlessTest”
	// See: http://code.google.com/p/selenium/wiki/ChromeDriver
	chromeHeadless {
		driver = {
			ChromeOptions o = new ChromeOptions()
			o.setHeadless(true)
			// crucial for running in a Docker container
			o.addArguments("--no-sandbox")
			o.addArguments("--disable-setuid-sandbox")
			o.addArguments("--disable-dev-shm-usage")
			o.addArguments("--window-size=1920,1080")
			new ChromeDriver(o)
		}
	}
	
	// run via “./gradlew firefoxTest”
	// See: http://code.google.com/p/selenium/wiki/FirefoxDriver
	firefox {
		atCheckWaiting = 1
		
		driver = {
			FirefoxOptions o = new FirefoxOptions();
//			o.addArguments("--window-size=1920,1080")
			o.addArguments("--width=1920")
			o.addArguments("--height=1080")
			new FirefoxDriver(o)
	 	}
	}

	// run via “./gradlew firefoxHeadlessTest”
	firefoxHeadless {
		atCheckWaiting = 1
		
		driver = {
			FirefoxOptions o = new FirefoxOptions();
			o.setHeadless(true);
//			o.addArguments("--window-size=1920,1080")
			o.addArguments("--width=1920")
                        o.addArguments("--height=1080")
			new FirefoxDriver(o)
	 	}
	}

}

// To run the tests with all browsers just run “./gradlew test”

//baseUrl = "http://192.168.66.25:3000"
//baseUrl = "http://172.20.10.7:3000"
//baseUrl = "https://t-force.lan.tarent.de/pepwall"
//baseUrl = "https://t-force.lan.tarent.de/pepwall_e2etest"
//baseUrl = System.getenv('FRONTEND_URL') ?: "https://t-force.lan.tarent.de/pepwall_e2etest"
baseUrl = "https://t-force.lan.tarent.de/t-learn/#/"
