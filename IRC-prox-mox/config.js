"use strict";
module.exports = {
    public: true,
    host: undefined,
    port: 9000,
    bind: undefined,
    reverseProxy: false,
    maxHistory: 10000,
    https: {
        enable: false,
        key: "",
        certificate: "",
        ca: "",
    },
    theme: "default",
    prefetch: false,
    disableMediaPreview: false,
    prefetchStorage: false,
    prefetchMaxImageSize: 2048,
    prefetchMaxSearchSize: 50,
    prefetchTimeout: 5000,
    fileUpload: {
        enable: false,
        maxFileSize: 10240,
        baseUrl: null,
    },
    transports: ["polling", "websocket"],
    leaveMessage: "The Lounge - https://thelounge.chat",
    //
    // This value is set to connect to the official channel of The Lounge on
    // Libera.Chat by default:
    //
    // ```js
    // defaults: {
    //   name: "Libera.Chat",
    //   host: "irc.libera.chat",
    //   port: 6697,
    //   password: "",
    //   tls: true,
    //   rejectUnauthorized: true,
    //   nick: "thelounge%%",
    //   username: "thelounge",
    //   realname: "The Lounge User",
    //   join: "#thelounge"
    // }
    // ```
    defaults: {
        name: "XAMKLAB-IRC.server",
        host: "127.0.0.1",
        port: 6667,
        password: "",
        tls: false,
        rejectUnauthorized: false,
        nick: "default%%",
        username: "default",
        realname: "",
        join: "#general",
        leaveMessage: "ayo!",
    },
    // ### `lockNetwork`
    //
    // When set to `true`, users will not be able to modify host, port and TLS
    // settings and will be limited to the configured network.
    // These fields will also be hidden from the UI.
    //
    // This value is set to `false` by default.
    lockNetwork: false,
    // ## User management
    // ### `messageStorage`
    // The Lounge can log user messages, for example to access them later or to
    // reload messages on server restart.
    // Set this array with one or multiple values to enable logging:
    // - `text`: Messages per network and channel will be stored as text files.
    //   **Messages will not be reloaded on restart.**
    // - `sqlite`: Messages are stored in SQLite database files, one per user.
    //
    // Logging can be disabled globally by setting this value to an empty array
    // `[]`. Logging is also controlled per user individually in the `log` key of
    // their JSON configuration file.
    //
    // This value is set to `["sqlite", "text"]` by default.
    messageStorage: ["sqlite", "text"],
    // ### `useHexIp`
    //
    // When set to `true`, users' IP addresses will be encoded as hex.
    //
    // This is done to share the real user IP address with the server for host
    // masking purposes. This is encoded in the `username` field and only supports
    // IPv4.
    //
    // This value is set to `false` by default.
    useHexIp: false,
    // ## WEBIRC support
    //
    // When enabled, The Lounge will pass the connecting user's host and IP to the
    // IRC server. Note that this requires to obtain a password from the IRC
    // network that The Lounge will be connecting to and generally involves a lot
    // of trust from the network you are connecting to.
    //
    // There are 2 ways to configure the `webirc` setting:
    //
    // - **Basic**: an object where keys are IRC hosts and values are passwords.
    //   For example:
    //
    //   ```json
    //   webirc: {
    //     "irc.example.net": "thisiswebircpassword1",
    //     "irc.example.org": "thisiswebircpassword2",
    //   },
    //   ```
    //
    // - **Advanced**: an object where keys are IRC hosts and values are functions
    //   that take two arguments (`webircObj`, `network`) and return an
    //   object to be directly passed to `irc-framework`. `webircObj` contains the
    //   generated object which you can modify. For example:
    //
    //   ```js
    //   webirc: {
    //     "irc.example.com": (webircObj, network) => {
    //       webircObj.password = "thisiswebircpassword";
    //       webircObj.hostname = `webirc/${webircObj.hostname}`;
    //       return webircObj;
    //     },
    //   },
    //   ```
    //
    // This value is set to `null` to disable WEBIRC by default.
    webirc: null,
    // ## identd and oidentd support
    // ### `identd`
    //
    // Run The Lounge with `identd` support.
    //
    // The available keys for the `identd` object are:
    //
    // - `enable`: When `true`, the identd daemon runs on server start.
    // - `port`: Port to listen for ident requests.
    //
    // The value of `enable` is set to `false` to disable `identd` support by
    // default, in which case the value of `port` is ignored. The default value of
    // `port` is 113.
    identd: {
        enable: false,
        port: 113,
    },
    // ### `oidentd`
    //
    // When this setting is a string, this enables `oidentd` support using the
    // configuration file located at the given path.
    //
    // This is set to `null` by default to disable `oidentd` support.
    oidentd: null,
    // ## LDAP support
    // These settings enable and configure LDAP authentication.
    //
    // They are only being used in private mode. To know more about private mode,
    // see the `public` setting above.
    //
    // The authentication process works as follows:
    //
    // 1. The Lounge connects to the LDAP server with its system credentials.
    // 2. It performs an LDAP search query to find the full DN associated to the
    //    user requesting to log in.
    // 3. The Lounge tries to connect a second time, but this time using the
    //    user's DN and password. Authentication is validated if and only if this
    //    connection is successful.
    //
    // The search query takes a couple of parameters in `searchDN`:
    //
    // - a base DN `searchDN/base`. Only children nodes of this DN will likely
    //   be returned;
    // - a search scope `searchDN/scope` (see LDAP documentation);
    // - the query itself, built as `(&(<primaryKey>=<username>) <filter>)`
    //   where `<username>` is the user name provided in the log in request,
    //   `<primaryKey>` is provided by the config and `<filter>` is a filtering
    //   complement also given in the config, to filter for instance only for
    //   nodes of type `inetOrgPerson`, or whatever LDAP search allows.
    //
    // Alternatively, you can specify the `bindDN` parameter. This will make The
    // Lounge ignore `searchDN` options and assume that the user DN is always
    // `<bindDN>,<primaryKey>=<username>`, where `<username>` is the user name
    // provided in the log in request, and `<bindDN>` and `<primaryKey>` are
    // provided by the configuration.
    //
    // The available keys for the `ldap` object are:
    ldap: {
        // - `enable`: when set to `false`, LDAP support is disabled and all other
        //   values are ignored.
        enable: false,
        // - `url`: A url of the form `ldaps://<ip>:<port>`.
        //   For plain connections, use the `ldap` scheme.
        url: "ldaps://example.com",
        // - `tlsOptions`: LDAP connection TLS options (only used if scheme is
        //   `ldaps://`). It is an object whose values are Node.js' `tls.connect()`
        //   options. It is set to `{}` by default.
        //   For example, this option can be used in order to force the use of IPv6:
        //   ```js
        //   {
        //     host: 'my::ip::v6',
        //     servername: 'example.com'
        //   }
        //   ```
        tlsOptions: {},
        // - `primaryKey`: LDAP primary key. It is set to `"uid"` by default.
        primaryKey: "uid",
        // - `baseDN`: LDAP base DN, alternative to `searchDN`. For example, set it
        //   to `"ou=accounts,dc=example,dc=com"`.
        //   When unset, the LDAP auth logic with use `searchDN` instead to locate users.
        // - `searchDN`: LDAP search DN settings. This defines the procedure by
        //   which The Lounge first looks for the user DN before authenticating them.
        //   It is ignored if `baseDN` is specified. It is an object with the
        //   following keys:
        searchDN: {
            //   - `rootDN`: This bind DN is used to query the server for the DN of
            //     the user. This is supposed to be a system user that has access in
            //     read-only to the DNs of the people that are allowed to log in.
            //     It is set to `"cn=thelounge,ou=system-users,dc=example,dc=com"` by
            //     default.
            rootDN: "cn=thelounge,ou=system-users,dc=example,dc=com",
            //   - `rootPassword`: Password of The Lounge LDAP system user.
            rootPassword: "1234",
            //   - `filter`: it is set to `"(&(objectClass=person)(memberOf=ou=accounts,dc=example,dc=com))"`
            //     by default.
            filter: "(&(objectClass=person)(memberOf=ou=accounts,dc=example,dc=com))",
            //   - `base`: LDAP search base (search only within this node). It is set
            //     to `"dc=example,dc=com"` by default.
            base: "dc=example,dc=com",
            //   - `scope`: LDAP search scope. It is set to `"sub"` by default.
            scope: "sub",
        },
    },
    // ## Debugging settings
    // The `debug` object contains several settings to enable debugging in The
    // Lounge. Use them to learn more about an issue you are noticing but be aware
    // this may produce more logging or may affect connection performance so it is
    // not recommended to use them by default.
    //
    // All values in the `debug` object are set to `false`.
    debug: {
        // ### `debug.ircFramework`
        //
        // When set to true, this enables extra debugging output provided by
        // [`irc-framework`](https://github.com/kiwiirc/irc-framework), the
        // underlying IRC library for Node.js used by The Lounge.
        ircFramework: false,
        // ### `debug.raw`
        //
        // When set to `true`, this enables logging of raw IRC messages into each
        // server window, displayed on the client.
        raw: false,
    },
};
