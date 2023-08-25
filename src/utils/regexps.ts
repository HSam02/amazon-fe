export class Regexps {
  public static readonly EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  public static readonly ONLY_LETTERS = /^[A-Za-z]+$/;
  public static readonly ONLY_DIGITS = /^[0-9]*$/;
  public static readonly PASSWORD = /^[A-Za-z\d@$!%*?&]+$/;
}
