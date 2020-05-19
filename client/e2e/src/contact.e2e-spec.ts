import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('Contact Page', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await browser.get(`${browser.baseUrl}/contact`);
  });

  it('should include contact information', () => {
    const contactClientList = element.all(by.css('ul.clientList'));

    expect(contactClientList.count()).toEqual(1);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
