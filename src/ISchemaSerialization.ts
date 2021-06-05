interface Ios{
    primary: String;
    fallback: String;
}
interface Android{
    primary: String;
    fallback: String;
}
interface URL{
    slug: String;
    web: String;
    ios: Ios;
    android: Android;
}
