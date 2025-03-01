/* eslint-disable @typescript-eslint/no-explicit-any */

import "mocha";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

import { RetryThis, IRetryThis } from "./retrythis";
import { ILogger } from "../../loggers/ilogger";
import { Logger } from "../../loggers/logger";

const logger: ILogger = new Logger("release-orchestrator");

describe("Retryable", () => {

    chai.use(chaiAsPromised);

    it("Should pass immediately", async () => {

        //#region ARRANGE

        const retryCount: number = 0;
        const retryThis: IRetryThis = new RetryThis(logger);

        //#endregion

        //#region ACT & ASSERT

        await chai.expect(retryThis.retry(retryCount)).not.to.be.rejected;

        //#endregion

    });

    it("Should retry and pass", async () => {

        //#region ARRANGE

        const retryCount: number = 3;
        const retryThis: IRetryThis = new RetryThis(logger);

        //#endregion

        //#region ACT & ASSERT

        await chai.expect(retryThis.retry(retryCount)).not.to.be.rejected;

        //#endregion

    });

    it("Should retry and fail", async () => {

        //#region ARRANGE

        const retryCount: number = 10;
        const retryThis: IRetryThis = new RetryThis(logger);

        //#endregion

        //#region ACT & ASSERT

        await chai.expect(retryThis.retry(retryCount)).to.be.rejected;

        //#endregion

    });

    it("Should retry empty and pass", async () => {

        //#region ARRANGE

        const retryCount: number = 3;
        const retryThis: IRetryThis = new RetryThis(logger);

        //#endregion

        //#region ACT & ASSERT

        const result: any = await retryThis.retryEmpty(retryCount);

        chai.expect(result).not.to.be.null;
        chai.expect(result).to.eq(3);

        //#endregion

    });

    it("Should retry empty and fail", async () => {

        //#region ARRANGE

        const retryCount: number = 6;
        const retryThis: IRetryThis = new RetryThis(logger);

        //#endregion

        //#region ACT & ASSERT

        await chai.expect(retryThis.retryEmpty(retryCount)).to.be.rejected;

        //#endregion

    });

});
