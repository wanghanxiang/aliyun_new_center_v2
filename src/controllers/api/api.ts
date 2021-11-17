import { Context } from "koa";
import { ApiService } from "../../service/ApiService";
import { post, get, put, del } from "../../util/decorator/httpMethod";

/**
 * 
 * api 测试controller类
 * 
 */
export default class AuthController {
    /**
     * 逻辑处理service类
     */
    private readonly service: ApiService;

    constructor() {
        this.service = new ApiService();
    }
    
    /**
     * 测试 request-Promise
     * @param ctx 
     * @returns 
     */
    @post("/testRequestV1")
    public async testRequestV1(ctx: Context) {
        return ctx.body = await this.service.testRequestV1();
    }
}