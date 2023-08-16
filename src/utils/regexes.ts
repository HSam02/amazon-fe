export class authRegexes {
  public static readonly EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  public static readonly FIRST_NAME = /^[A-Za-z]+$/;
  public static readonly LAST_NAME = /^[A-Za-z]+$/;
  public static readonly CODE = /^\d{6}$/;
  public static readonly PASSWORD = /^[A-Za-z\d@$!%*?&]+$/;
}
