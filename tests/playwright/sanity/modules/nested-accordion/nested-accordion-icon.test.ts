import { test } from '@playwright/test';
import WpAdminPage from '../../../pages/wp-admin-page';
import { expectScreenshotToMatchLocator, addIcon, setIconSize } from './helper';

test.describe( 'Nested Accordion Title Icon and Text No Overlap @nested-accordion', () => {
	const atomicExperimentStateCases = [ true, false ]; // Todo: remove once experiment is merged

	test.beforeAll( async ( { browser }, testInfo ) => {
		const context = await browser.newContext();
		const page = await context.newPage();
		const wpAdmin = new WpAdminPage( page, testInfo );

		await wpAdmin.setExperiments( {
			container: 'active',
			'nested-elements': 'active',
		} );

		await page.close();
	} );

	test.afterAll( async ( { browser }, testInfo ) => {
		const context = await browser.newContext();
		const page = await context.newPage();
		const wpAdmin = new WpAdminPage( page, testInfo );
		await wpAdmin.setExperiments( {
			'nested-elements': 'inactive',
			container: 'inactive',
			e_font_icon_svg: 'default',
		} );

		await page.close();
	} );

	for ( const atomicExperimentState of atomicExperimentStateCases ) { // Todo: remove once experiment is merged
		const testTitleSuffix = 'Atomic experiment ' + ( atomicExperimentState ? 'active' : 'inactive' ); // Todo: remove once experiment is merged AND UPDATE TITLES

		test( 'Nested Accordion Title Icon and Text No Overlap: ' + testTitleSuffix, async ( { browser }, testInfo ) => {
			let url;
			await test.step( 'experiment Inline Font Icons off', async () => {
				const page = await browser.newPage(),
					wpAdmin = new WpAdminPage( page, testInfo );

				await wpAdmin.setExperiments( {
					e_font_icon_svg: 'inactive',
					e_nested_atomic_repeaters: atomicExperimentState ? 'active' : 'inactive',
				} );

				const editor = await wpAdmin.openNewPage(),
					container = await editor.addElement( { elType: 'container' }, 'document' );

				// Act
				// Set horizontal icon & style size to 70
				await editor.closeNavigatorIfOpen();
				const nestedAccordionID = await editor.addWidget( 'nested-accordion', container );
				const nestedAccordion = await editor.selectElement( nestedAccordionID );
				await addIcon( editor, page, 'address card' );
				await setIconSize( editor, '70' );

				// Assert
				await expectScreenshotToMatchLocator( 'header-style-editor-test-off.png', nestedAccordion );
				await editor.publishAndViewPage();
				const nestedAccordionWidget = page.locator( '.e-n-accordion' );
				await editor.isUiStable( nestedAccordionWidget );
				await expectScreenshotToMatchLocator( 'header-style-editor-test-off-frontend.png', nestedAccordionWidget );
				url = page.url();
			} );

			await test.step( 'experiment Inline Font Icons on (default)', async () => {
				const page = await browser.newPage(),
					wpAdmin = new WpAdminPage( page, testInfo );
				await wpAdmin.setExperiments( {
					e_font_icon_svg: 'active',
				} );
				const editor = await wpAdmin.openNewPage();

				// Assert
				await page.goto( url );
				const nestedAccordionWidget = page.locator( '.e-n-accordion' );
				await editor.isUiStable( nestedAccordionWidget );
				await expectScreenshotToMatchLocator( 'header-style-editor-test-on-frontend.png', nestedAccordionWidget );
			} );
		} );
	}
} );
