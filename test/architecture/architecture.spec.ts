import { filesOfProject } from 'tsarch';

describe('architecture', () => {
	it('application should not depend on the infraestructure', async () => {
		const res = await filesOfProject()
			.matchingPattern('src/application')
			.shouldNot()
			.dependOnFiles()
			.matchingPattern('src/infrastructure')
			.check();
		if (res.length !== 0) console.log(res);
		expect(res).toHaveLength(0);
	});

	it('domain should not depend on the infraestructure', async () => {
		const res = await filesOfProject()
			.matchingPattern('src/domain')
			.shouldNot()
			.dependOnFiles()
			.matchingPattern('src/infrastructure')
			.check();
		if (res.length !== 0) console.log(res);
		expect(res).toHaveLength(0);
	});

	it('domain should not depend on the application', async () => {
		const rule = filesOfProject()
			.matchingPattern('src/domain')
			.shouldNot()
			.dependOnFiles()
			.matchingPattern('src/application');
		const res = await rule.check();

		if (res.length !== 0) console.log(res);
		expect(res).toHaveLength(0);
	});

	it('primary infrastructure should not depend on the secondary infrastructure', async () => {
		const rule = filesOfProject()
			.matchingPattern('src/infrastructure/primary-adapters')
			.shouldNot()
			.dependOnFiles()
			.matchingPattern('src/infrastructure/secondary-adapters');
		const res = await rule.check();

		if (res.length !== 0) console.log(res);
		expect(res).toHaveLength(0);
	});

	it('secondary infrastructure should not depend on the primary infrastructure', async () => {
		const rule = filesOfProject()
			.matchingPattern('src/infrastructure/secondary-adapters')
			.shouldNot()
			.dependOnFiles()
			.matchingPattern('src/infrastructure/primary-adapters');
		const res = await rule.check();

		if (res.length !== 0) console.log(res);
		expect(res).toHaveLength(0);
	});
});
