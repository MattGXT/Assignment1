import { AppPage } from './app.po';
import { protractor,browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navigation bar', () => {
    page.navigateTo();
    var navbar = element(by.id('navbar'));
    expect(navbar).toBeTruthy;
  });

  it('should display login button', () => {
    page.navigateTo();
    var login = element(by.id('login'));
    expect(login).toBeTruthy;
  });

  it('should display group button', () => {
    page.navigateTo();
    var group = element(by.id('group'));
    expect(group).toBeTruthy;
  });

  it('should able to login', () => {
    page.navigateTo();
    var login = element(by.id('login'));
    page.clickbutton(login);
    browser.waitForAngularEnabled(false);
    var username = element(by.id('username'));
    var password = element(by.id('password'));
    var loginbutton = element(by.id('login_btn'));
    username.sendKeys('super');
    password.sendKeys(0);
    page.clickbutton(loginbutton);
    browser.driver.sleep(1000);
    browser.switchTo().alert().accept();
    browser.waitForAngularEnabled(false);
    var group = element(by.id('group'));
    expect(group).toBeTruthy;
  });

  it('should display group', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    var groupname = element(by.id('groupname'));
    expect(groupname).toBeTruthy;
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
