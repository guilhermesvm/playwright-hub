import { expect } from "@playwright/test";
import { generateRandomUser } from "../factories/userFactory";
import { loggedTest } from "../fixtures/isolatedWorkerLoginTest";

loggedTest.describe('Profile Page', () => {
    loggedTest('Should edit user profile', async({ profilePage }) => {
        const body = generateRandomUser();
        const currentEmail = await profilePage.getEmailInputValue();

        await expect(profilePage.submitUpdateButton).toBeDisabled();
        await profilePage.updateUser({...body, email: currentEmail});
        await expect(profilePage.submitUpdateButton).toBeEnabled();
        await profilePage.submitUpdateForm();
        await profilePage.successfulUpdate();

        await profilePage.visitPage();
        await profilePage.assertSuccessfulDataUpdate(body);
    });
    
    loggedTest('Should successfully sign out', async({ profilePage }) => {
        await profilePage.signOut();
        await profilePage.successfullySignedOut();
    });
});