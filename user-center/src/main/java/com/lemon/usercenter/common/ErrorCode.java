package com.lemon.usercenter.common;

/**
 * 错误码
 * @author lemon
 */
public enum ErrorCode {

    PARAMS_ERROR(40000,"请求参数错误",""),
    NULL_Error(40001,"请求数据为空",""),
    NO_LOGIN(40100,"未登录",""),
    NO_AUTH(40101,"无权限",""),

    SUCCESS(0,"ok",""),

    SYSTEM_ERROR(50000,"系统内部异常",""),

    TASK_ERROR(50001,"已经有执行任务",""),
    DEVICE_ERROR(60001,"编号重复","")
    ;
    /**
     * 状态码
     */
    private final int code;
    /**
     * 状态码信息
     */
    private final String message;
    /**
     * 状态码详情
     */
    private final String description;

    ErrorCode(int code, String message, String description) {
        this.code = code;
        this.message = message;
        this.description = description;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getDescription() {
        return description;
    }
}
