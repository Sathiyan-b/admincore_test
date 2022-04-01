import {
  browser,
  logging,
  element,
  by,
  Key,
  ExpectedConditions,
} from "protractor";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
import * as path from "path";



let waitUntilTheElementAppearsAgainstID = async (element_id: string) => {
  await browser.wait(
    ExpectedConditions.presenceOf(element(by.id(element_id))),
    20000,
    `Element with ID ${element_id} taking too long to appear in the DOM`
  );
};
let waitUntilTheElementAppearsAgainstXPath = async (element_xpath: string) => {
  await browser.wait(
   ExpectedConditions.presenceOf(element(by.xpath(element_xpath))),
    20000,
    `Element with Xpath ${element_xpath} taking too long to appear in the DOM`
  );
};

describe("TID-AdminCore UI Testing of Admincore", () => {
  browser.ignoreSynchronization = true;
  browser.manage().window().maximize();
  browser.manage().timeouts().implicitlyWait(30000);

  var workbook = XLSX.readFile(path.join(__dirname, "../assets/input.xlsx"));
  var Role: string = `Role ${uuidv4()}`;

it("TID-AdminCore-001 The system shall be accessible with the following internet browsers Chrome", async () => {
  await browser.get(browser.baseUrl);
  expect(browser.getTitle).toEqual("Admin Core™");
  await browser.sleep(2000);
});

// var greeting = element(by.binding('yourName'));
// expect(await greeting.getText()).toEqual('Hello Julie!');

it("TID-Admincore-002 User shall verify, system  allow user to login to the Admin Core when both the inputs are correct", async () => {
  await element(by.id("loginUserNameInput")).click();
  await browser.sleep(2000)
	await element(by.id("loginUserNameInput")).sendKeys('superadmin');
  await browser.sleep(2000)
	await element(by.id("loginPasswordInput")).click();
  await browser.sleep(2000)
	await element(by.id("loginPasswordInput")).sendKeys('password');
  await browser.sleep(2000)
	await element(by.id("loginLoginButton")).click();
  await browser.sleep(2000)
});
it("TID-Alarm-003 User shall verify, system allow user to browse all the screens ", async () => {
  await element(by.id("AccessControlRolesTab")).click();
  await browser.sleep(2000)
  await element(by.id("AccessControlUsersTab")).click();
  await browser.sleep(2000)
  await element(by.id("AccessControlUserTeamTab")).click();
  await browser.sleep(2000)
  await element(by.id("AccessControlPointofCareTab")).click();
  await browser.sleep(2000)
  await element(by.id("AccessControlPasswordPolicyTab")).click();
  await browser.sleep(2000)
  await element(by.xpath("//img[@alt='Application']")).click();
  await browser.sleep(2000)
  await element(by.xpath("//img[@alt='Enterprise']")).click();
  await browser.sleep(2000)
  await element(by.xpath("//img[@alt='Settings']")).click();
  await browser.sleep(2000)
}) 

it("TID-Admincore System should be support to filter the roles", async () => { 
  await element(by.xpath("//img[@alt='AccessControl']")).click();
  await browser.sleep(2000)
  await element(by.id("AccessControlRolesTab")).click();
  await browser.sleep(2000)
  await element(by.id("roleSelectedFilterButton")).click();
  await browser.sleep(2000)
  await element(by.id("roleOptioninactive")).click();
  await browser.sleep(2000)
  await element(by.id("roleSelectedFilterButton")).click();
  await browser.sleep(2000)
  await element(by.id("roleOptionactive")).click();  
  await browser.sleep(2000) 
})  
it("TID-Admincore System should be support to view and search the  active role records", async () => { 
  await element(by.xpath("//div[@id='filter-name']/div/input")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-name']/div/input")).sendKeys('admin');
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-name']/div/input")).clear();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-purpose']/div/input")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-purpose']/div/input")).sendKeys('monitor');
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-purpose']/div/input")).clear();
})  
it("TID-Admincore System should be support to create the role", async () => { 
	await element(by.id("rolesAddButton")).click();
  await browser.sleep(2000)
	await element(by.name("name")).click();
  await browser.sleep(2000)
  await element(by.name("name")).sendKeys(Role);
  await browser.sleep(2000)
	await element(by.name("purpose")).click();
  await browser.sleep(2000)
	await element(by.name("purpose")).sendKeys(Role);
  await browser.sleep(2000)
  var source=element(by.xpath("//div[normalize-space()='Can View RoleProfile']"));
	var target=element(by.id("cdk-drop-list-1"));
  await browser.actions().dragAndDrop(source,target).perform();
  await browser.sleep(5000)
  await element(by.id("roleMergeSaveButton")).click();
  await browser.sleep(2000)
  // var greeting = element(by.binding('yourName'));
// expect(await greeting.getText()).toEqual('Hello Julie!');
  var toast= element(by.id("toast-container"));
  expect(toast.getText).toEqual("Role defenition saved successfully");
  await element(by.id("roleMergeCancelButton")).click();
  await browser.sleep(2000)
});
it("TID-Admincore System should be support to edit the active role", async () => { 
  await element(by.name("name")).click();
  await browser.sleep(2000)
  await element(by.name("name")).clear();
  await browser.sleep(2000)
  await element(by.name("name")).sendKeys(Role);
  await browser.sleep(2000)
	await element(by.name("purpose")).click();
  await browser.sleep(2000)
  await element(by.name("purpose")).clear();
  await browser.sleep(2000)
	await element(by.name("purpose")).sendKeys(Role);
  await browser.sleep(2000)
  await element(by.id("roleMergeSaveButton")).click();
  await browser.sleep(2000)
  await element(by.id("roleMergeCancelButton")).click();
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to delete active the role", async () => { 
  await element(by.xpath("//div[@id='filter-name']/div/input")).click();
  await browser.sleep(2000)
	await element(by.xpath("//div[@id='filter-name']/div/input")).sendKeys('Role');
  await browser.sleep(2000)
	await element(by.xpath("//div[@id='rolesGrid']/div[4]/div[3]/div/div[3]/div[2]/i")).click();
  await browser.sleep(2000)
	await element(by.xpath("//button[@id='btnOk']/span")).click();
})
it("TID-Admincore System should be support to view and search the inactive role records", async () => { 
  await element(by.id("roleSelectedFilterButton")).click();
  await browser.sleep(2000)
  await element(by.id("roleOptioninactive")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-name']/div/input")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-name']/div/input")).sendKeys('admin');
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-name']/div/input")).clear();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-purpose']/div/input")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-purpose']/div/input")).sendKeys('patient');
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-purpose']/div/input")).clear();
  await browser.sleep(2000)  
})
it("TID-Admincore System should be support to edit the inactive role", async () => { 
  await element(by.name("name")).click();
  await browser.sleep(2000)
  await element(by.name("name")).clear();
  await browser.sleep(2000)
  await element(by.name("name")).sendKeys(Role);
  await browser.sleep(2000)
	await element(by.name("purpose")).click();
  await browser.sleep(2000)
  await element(by.name("purpose")).clear();
  await browser.sleep(2000)
	await element(by.name("purpose")).sendKeys(Role);
  await browser.sleep(2000)
  await element(by.id("roleMergeSaveButton")).click();
  await browser.sleep(2000)
  await element(by.id("roleMergeCancelButton")).click();
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to change the inactive role to active role", async () => { 
  await element(by.id("roleSelectedFilterButton")).click();
  await browser.sleep(2000)
  await element(by.id("roleOptioninactive")).click();
  await browser.sleep(2000)
  await element(by.xpath("(//i[@class='fa fa-user-plus'])[1]")).click();
  await browser.sleep(2000)
  await element(by.xpath("//button[@id='btnOk']/span")).click();
  await browser.sleep(2000)
})
// it("TID-Admincore System should be support to filter the users", async () => { 
//   await element(by.xpath("//div[@id='mat-tab-label-0-1']/div")).click();
//   await browser.sleep(2000)
//   await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
//   await browser.sleep(2000)
//   await element(by.xpath("//div[@id='adfd7a4ff60c-1']/span")).click();
//   await browser.sleep(2000)
//   await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
//   await browser.sleep(2000)
//   await element(by.xpath("//div[@id='adfd7a4ff60c-2']/span")).click();
//   await browser.sleep(2000)
//   await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
//   await browser.sleep(2000)
//   await element(by.id("adfd7a4ff60c-0")).click();   
//   await browser.sleep(2000) 
// })
// it("TID-Admincore System should be support to view and search the  active user records", async () => { 
//   await element(by.xpath("//div[@id='mat-tab-label-0-1']/div")).click();
//   await browser.sleep(2000)
//   await element(by.xpath("//div[@id='filter-first_name']/div/input")).click();
//   await browser.sleep(2000)
//   await element(by.xpath("//div[@id='filter-first_name']/div/input")).sendKeys('test');
//   await browser.sleep(2000)
//   await element(by.xpath("//div[@id='filter-first_name']/div/input")).clear();
//   await browser.sleep(2000)
//   await element(by.xpath("//div[@id='filter-login']/div/input")).click();
//   await browser.sleep(2000)
//   await element(by.xpath("//div[@id='filter-login']/div/input")).sendKeys('test');
//   await browser.sleep(2000)
//   await element(by.xpath("//div[@id='filter-login']/div/input")).clear();
//   await browser.sleep(2000)
// // })  
it("TID-Admincore System should be support to create the user", async () => { 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-1']/div/alarm-users/div/mat-card/div/button/span")).click();
  await browser.sleep(2000)
  await element(by.name("first_name")).click();
  await browser.sleep(2000)
  await element(by.name("first_name")).sendKeys('anu');
  await browser.sleep(2000)
  await element(by.name("last_name")).click();
  await browser.sleep(2000)
  await element(by.name("last_name")).sendKeys('anand');
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/alarm-user-merge/form/mat-card/div[2]/div/div/mat-form-field/div/div/div[3]")).click();
  await browser.sleep(2000)
	await element(by.xpath("//span[text()='India']")).click();
  await browser.sleep(2000)
	await element(by.name("mobile_number")).click();
  await browser.sleep(2000)
  
	await element(by.name("mobile_number")).sendKeys('1234567890');
  await browser.sleep(2000)
  await element(by.name("email")).click();
  await browser.sleep(2000)
  Role = `Test${uuidv4()}@g.com`;
  await element(by.name("email")).sendKeys(Role);
  await browser.sleep(2000)
  Role = `Test${uuidv4()}`;
  await element(by.name("login")).sendKeys(Role);
  await browser.sleep(2000)
  await element(by.name("password")).click();
  await browser.sleep(2000)
  await element(by.name("password")).sendKeys('anu05@');
  await browser.sleep(2000)
  await element(by.name("confirm_password")).click();
  await browser.sleep(2000)
  await element(by.name("confirm_password")).sendKeys('anu05@');
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/alarm-user-merge/form/mat-card/div[2]/ng-select/div/span")).click();
  await browser.sleep(2000)
  await element(by.id("a3f6d997a0e8-4")).click();
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/alarm-user-merge/form")).click();
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/alarm-user-merge/form/mat-card/div/button/span")).click();
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to edit the active user", async () => {
  await element(by.xpath("//div[@id='usersGrid']/div[4]/div[3]/div/div[5]/div/i")).click();
  await browser.sleep(2000)
  await element(by.name("first_name")).click();
  await browser.sleep(2000)
  await element(by.name("first_name")).clear();
  await browser.sleep(2000)
  await element(by.name("first_name")).sendKeys('Test-100');
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/alarm-user-merge/form/mat-card/div/button/span/i")).click();
  await browser.sleep(2000)    
})
it("TID-Admincore System should be support to delete the active user", async () => {  
  await element(by.xpath("//div[@id='usersGrid']/div[4]/div[3]/div/div[6]/div[2]/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//button[@id='btnOk']/span")).click(); 
  await browser.sleep(2000) 
})
it("TID-Admincore System should be support to lock the active user", async () => {  
  await element(by.xpath("//div[@id='usersGrid']/div[4]/div[3]/div/div[12]/div[3]/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//button[@id='btnOk']/span")).click();  
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to view & search the inactive user", async () => {
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/span[2]")).click();
  await browser.sleep(2000)
  await element(by.id("abc427498fdf-1")).click();
  await browser.sleep(2000)
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-1-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/span[2]")).click();
  await browser.sleep(2000)
  await element(by.id("abc4547c59d9-1")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-first_name']/div/input")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-first_name']/div/input")).sendKeys('test_17');
  await browser.sleep(2000)    
})
it("TID-Admincore System should be support to edit the inactive user", async () => { 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-1-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/span[2]")).click();
  await browser.sleep(2000)
  await element(by.id("a99756aea917-1")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='usersGrid']/div[4]/div[3]/div/div[5]/div/i")).click();
  await browser.sleep(2000)
  await element(by.id("mat-input-2")).click();
  await browser.sleep(2000)
  await element(by.id("mat-input-2")).sendKeys('Test7849@gmail.com');
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/alarm-user-merge/form/mat-card/div/button/span/i")).click();
  await browser.sleep(2000)   
})
it("TID-Admincore System should be support to change the inactive user to active user", async () => { 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.id("a7e5d897cdc5-1")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='usersGrid']/div[4]/div[3]/div/div[2]/div[2]/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//button[@id='btnOk']/span")).click();
  await browser.sleep(2000)
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='a7e5d897cdc5-0']/span")).click();
  await browser.sleep(2000)  
})
it("TID-Admincore System should be support to view and search the locked user records", async () => {
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='a53b95d6ee51-2']/span")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-first_name']/div/input")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-first_name']/div/input")).sendKeys('test_18');
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='filter-first_name']/div/input")).sendKeys('');
  await browser.sleep(2000)  
})
it("TID-Admincore System should be support to edit the locked user", async () => {
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='a53b95d6ee51-2']/span")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='usersGrid']/div[4]/div[3]/div/div[2]/div/i")).click();
  await browser.sleep(2000)
  await element(by.id("mat-input-0")).click();
  await browser.sleep(2000)
  await element(by.id("mat-input-0")).sendKeys('Test_160');
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/alarm-user-merge/form/mat-card/div/button/span/i")).click();
  await browser.sleep(2000)   
})
it("TID-Admincore System should be support to delete the locked user", async () => { 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-1-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='add49175d895-2']/span")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='usersGrid']/div[4]/div[3]/div/div[2]/div[2]/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//button[@id='btnOk']/span")).click();  
  await browser.sleep(2000)  
})
it("TID-Admincore System should be support to change the locked user to active user", async () => { 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-1-1']/div/alarm-users/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.id("add49175d895-2")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='usersGrid']/div[4]/div[3]/div/div/div[3]/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//button[@id='btnOk']/span")).click(); 
  await browser.sleep(2000) 
})
it("TID-Admincore System should be support to filter the user teams", async () => { 
  await element(by.xpath("//div[@id='mat-tab-label-0-2']/div")).click();
  await browser.sleep(2000)
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-2']/div/alarm-userteam/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000) 
	await element(by.id("a7a48bb7148f-1")).click();
  await browser.sleep(2000) 
	await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-2']/div/alarm-userteam/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)  
	await element(by.id("a7a48bb7148f-0")).click();
  await browser.sleep(2000) 
})
it("TID-Admincore System should be support to view and search the  active user team records", async () => {
  await element(by.xpath("//div[@id='mat-tab-label-0-2']/div")).click();
  await browser.sleep(2000)
  await element(by.id("filter-Team name")).click();
  await browser.sleep(2000) 
  await element(by.id("filter-Team name")).sendKeys('team');
  await browser.sleep(2000) 
  await element(by.id("filter-Team name")).clear();
  await browser.sleep(2000) 
  await element(by.id("filter-Members")).click();
  await browser.sleep(2000) 
  await element(by.id("filter-Members")).sendKeys('test');
  await browser.sleep(2000) 
  await element(by.id("filter-Members")).clear();     
})
it("TID-Admincore System should be support to create the user team", async () => { 
  await element(by.xpath("//div[@id='mat-tab-label-0-2']/div")).click();
  await browser.sleep(2000) 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-2']/div/alarm-userteam/div/mat-card/div/button/span")).click();
  await browser.sleep(2000) 
  await element(by.name("display_text")).click();
  await browser.sleep(2000) 
  await element(by.name("display_text")).sendKeys('team-50');
  await browser.sleep(2000) 
  await element(by.name("team_purpose")).click();
  await browser.sleep(2000) 
  await element(by.name("team_purpose")).sendKeys('to monitor patients');
  await browser.sleep(2000) 
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/user-team-merge/form/mat-card/div/button/span/i")).click();
  await browser.sleep(2000)  
})
it("TID-Admincore System should be support to edit the active user team", async () => {   
  await element(by.xpath("//div[@id='mat-tab-label-0-2']/div")).click();
  await browser.sleep(2000) 
  await element(by.xpath("//i[@name='edit']")).click();
  await browser.sleep(2000) 
  await element(by.name("display_text")).click();
  await browser.sleep(2000) 
  await element(by.name("display_text")).clear();
  await browser.sleep(2000) 
  await element(by.name("display_text")).sendKeys('Ki team100');
  await browser.sleep(2000) 
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/user-team-merge/form/mat-card/div/button")).click();
  await browser.sleep(2000) 
})
it("TID-Admincore System should be support to delete active the user team", async () => { 
  await element(by.xpath("//div[@id='mat-tab-label-0-2']/div")).click();
  await browser.sleep(2000) 
  await element(by.xpath("//div[@id='userTeamGrid']/div[4]/div[3]/div/div/div[2]/i")).click();
  await browser.sleep(2000)
	await element(by.xpath("//button[@id='btnOk']/span")).click(); 
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to view and search the inactive user team records", async () => { 
  await element(by.xpath("//div[@id='mat-tab-label-0-2']/div")).click();
  await browser.sleep(2000) 
  await element(by.id("filter-display_text")).click();
  await browser.sleep(2000)
  await element(by.id("filter-display_text")).sendKeys('team');
  await browser.sleep(2000)
  await element(by.id("filter-members")).click();
  await browser.sleep(2000)
  await element(by.id("filter-members")).sendKeys('test');
  await browser.sleep(2000)
  await element(by.id("filter-members")).sendKeys(Key.ENTER);
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to edit the inactive user team", async () => { 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-4-2']/div/alarm-userteam/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='a4c27d135206-1']/span")).click();
  await browser.sleep(2000)
  await element(by.xpath("//i[@name='edit']")).click();
  await browser.sleep(2000)
  await element(by.id("mat-input-11")).click();
  await browser.sleep(2000)
  await element(by.id("mat-input-11")).sendKeys(' Test_team5');
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/user-team-merge/form/mat-card/div/button/span/i")).click();
  await browser.sleep(2000)   
})
it("TID-Admincore System should be support to change the inactive user team to active user team", async () => {
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-6-2']/div/alarm-userteam/div/mat-card/div[2]/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.id("a031f7dbd7fe-1")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='userTeamGrid']/div[4]/div[3]/div/div/div[3]/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//button[@id='btnOk']/span")).click();
  await browser.sleep(2000)   
})
it("TID-Admincore System should be support to filter the POC", async () => { 
  await element(by.xpath("//div[@id='mat-tab-label-0-3']/div")).click();
  await browser.sleep(2000)  
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-3']/div/alarm-pointofcare/div/mat-card/div/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)  
  await element(by.id("a7eb6a2a4ca3-1")).click();
  await browser.sleep(2000)  
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-2-3']/div/alarm-pointofcare/div/mat-card/div/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)  
  await element(by.id("a7eb6a2a4ca3-0")).click();
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to view and search the  active POC records", async () => {
  await element(by.xpath("//div[@id='mat-tab-label-0-3']/div")).click();
  await browser.sleep(2000)
	await element(by.id("filter-Name")).click();
  await browser.sleep(2000)
	await element(by.id("filter-Name")).sendKeys('picu');
  await browser.sleep(2000)
	await element(by.id("filter-Name")).clear();
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to edit the active POC", async () => {
  await element(by.xpath("//div[@id='mat-tab-label-0-3']/div")).click();
  await browser.sleep(2000)
  await element(by.name("edit")).click();
  await browser.sleep(2000)
  await element(by.name("purpose")).click();
  await browser.sleep(2000)
  await element(by.name("purpose")).clear();
  await browser.sleep(2000)
  await element(by.name("purpose")).sendKeys('To monitor patients alerts ');
  await browser.sleep(2000)
  await element(by.name("poc_allow_subscriber")).click();
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/pointofcare-merge/form/mat-card/div/button/span/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='toast-container']/div")).click();
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/pointofcare-merge/form/mat-card/div/button[2]/span/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//button[@id='btnOk']/span")).click(); 
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to delete active the user team", async () => { 
  await element(by.xpath("//div[@id='mat-tab-label-0-3']/div")).click();
  await browser.sleep(2000)
  await element(by.xpath("//div[@id='pointofcareGrid']/div[4]/div[3]/div/div/div[2]/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//button[@id='btnOk']/span")).click();
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to view and search the inactive POC records", async () => { 
  await element(by.xpath("//div[@id='mat-tab-label-0-3']/div")).click();
  await browser.sleep(2000)
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-3']/div/alarm-pointofcare/div/mat-card/div/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.id("a1bb3004c5dc-1")).click();
  await browser.sleep(2000)
  await element(by.id("filter-Name")).click();
  await browser.sleep(2000)
  await element(by.id("filter-Name")).sendKeys('icu');
  await browser.sleep(2000)
  await element(by.id("filter-Name")).clear();  
  await browser.sleep(2000)
})
it("TID-Admincore System should be support to edit the inactive POC", async () => {
  await element(by.xpath("//div[@id='mat-tab-label-0-3']/div")).click();
  await browser.sleep(2000)
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-3']/div/alarm-pointofcare/div/mat-card/div/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000)
  await element(by.id("a438e4e3c98d-1")).click();
  await browser.sleep(2000)
  await element(by.name("edit")).click();
  await browser.sleep(2000)
  await element(by.id("purpose")).click();
  await browser.sleep(2000)
  await element(by.id("purpose")).clear();
  await browser.sleep(2000)
  await element(by.id("purpose")).sendKeys('To monitor patients alerts');
  await browser.sleep(2000)
  await element(by.name("poc_allow_subscriber")).click();
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/pointofcare-merge/form/mat-card/div/button/span/i")).click();
  await browser.sleep(2000)
  await element(by.xpath("//body[@id='page-top']/app-root/alarm-root/mat-sidenav-container/mat-sidenav-content/div/pointofcare-merge/form/mat-card/div/button[2]/span")).click();
  await browser.sleep(2000)
  await element(by.id("btnOk")).click();
  await browser.sleep(2000) 
})
it("TID-Admincore System should be support to change the inactive POC to active POC", async () => {   
  await element(by.xpath("//div[@id='mat-tab-label-0-3']/div")).click();
  await browser.sleep(2000) 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-3']/div/alarm-pointofcare/div/mat-card/div/ng-select/div/div/div[3]")).click();
  await browser.sleep(2000) 
  await element(by.id("ab4adc04618b-1")).click();
  await browser.sleep(2000) 
  await element(by.xpath("//div[@id='pointofcareGrid']/div[4]/div[3]/div/div/div[2]/i")).click();
  await browser.sleep(2000) 
  await element(by.xpath("//button[@id='btnOk']/span")).click();
  await browser.sleep(2000) 
})             
it("TID-Admincore System should be support to define the threshold value for password policy", async () => {
  await element(by.xpath("//div[@id='mat-tab-label-0-4']/div")).click();
  await browser.sleep(2000) 
  await element(by.name("min_length")).click();
  await browser.sleep(2000) 
  await element(by.name("min_length")).clear();
  await browser.sleep(2000) 
  await element(by.name("min_length")).sendKeys('6');
  await browser.sleep(2000) 
  await element(by.name("max_length")).click();
  await browser.sleep(2000) 
  await element(by.name("max_length")).clear();
  await browser.sleep(2000) 
  await element(by.name("max_length")).sendKeys('10');
  await browser.sleep(2000) 
  await element(by.name("repeat_old_password_restriction")).click();
  await browser.sleep(2000) 
  await element(by.name("repeat_old_password_restriction")).clear();
  await browser.sleep(2000) 
  await element(by.name("repeat_old_password_restriction")).sendKeys('5');
  await browser.sleep(2000) 
  await element(by.name("password_change_frequency")).click();
  await browser.sleep(2000) 
  await element(by.name("password_change_frequency")).clear();
  await browser.sleep(2000) 
  await element(by.name("password_change_frequency")).sendKeys('180');
  await browser.sleep(2000) 
  await element(by.name("failed_login_attempts_allowed")).click();
  await browser.sleep(2000) 
  await element(by.name("failed_login_attempts_allowed")).clear();
  await browser.sleep(2000) 
  await element(by.name("failed_login_attempts_allowed")).sendKeys('5');
  await browser.sleep(2000) 
  await element(by.xpath("//mat-radio-button[@id='mat-radio-2']/label/span/span[2]")).click();
  await browser.sleep(2000) 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-4']/div/password-policy/form/mat-card/div[2]/mat-form-field[2]/div/div/div[3]")).click();
  await browser.sleep(2000) 
  await element(by.xpath("//mat-tab-body[@id='mat-tab-content-0-4']/div/password-policy/form/mat-card/div/button/span/i")).click();
  await browser.sleep(2000)    
})
it("TID-Admincore System should be support to view and search the application records", async () => {
  await element(by.xpath("//input[@type='text']")).click();
  await element(by.xpath("//input[@type='text']")).sendKeys('guardian');
  await element(by.xpath("//div[@id='filter-Success callback']/div/input")).click();
  await element(by.xpath("//div[@id='filter-Success callback']/div/input")).sendKeys('http');
  await element(by.xpath("//div[@id='filter-Success callback']/div/input")).sendKeys(Key.ENTER);
  await element(by.xpath("//div[@id='filter-Success callback']/div/input")).sendKeys('');
  await element(by.xpath("//input[@type='text']")).click();
  await element(by.xpath("//input[@type='text']")).sendKeys('');
})
it("TID-Admincore System should be support to view and search the application records", async () => {
  
})  
})
