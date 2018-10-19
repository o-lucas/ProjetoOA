module.exports = [
    '#define SHADER_NAME PHASER_FORWARD_DIFFUSE_FS',
    '',
    'precision mediump float;',
    '',
    'struct Light',
    '{',
    '    vec2 position;',
    '    vec3 color;',
    '    float intensity;',
    '    float radius;',
    '};',
    '',
    'const int kMaxLights = %LIGHT_COUNT%;',
    '',
    'uniform vec4 uCamera; /* x, y, rotation, zoom */',
    'uniform vec2 uResolution;',
    'uniform sampler2D uMainSampler;',
    'uniform sampler2D uNormSampler;',
    'uniform vec3 uAmbientLightColor;',
    'uniform Light uLights[kMaxLights];',
    '',
    'varying vec2 outTexCoord;',
    'varying vec4 outTint;',
    '',
    'void main()',
    '{',
    '    vec3 finalColor = vec3(0.0, 0.0, 0.0);',
    '    vec4 color = texture2D(uMainSampler, outTexCoord) * vec4(outTint.rgb * outTint.a, outTint.a);',
    '    vec3 normalMap = texture2D(uNormSampler, outTexCoord).rgb;',
    '    vec3 normal = normalize(vec3(normalMap * 2.0 - 1.0));',
    '    vec2 res = vec2(min(uResolution.x, uResolution.y)) * uCamera.w;',
    '',
    '    for (int index = 0; index < kMaxLights; ++index)',
    '    {',
    '        Light light = uLights[index];',
    '        vec3 lightDir = vec3((light.position.xy / res) - (gl_FragCoord.xy / res), 0.1);',
    '        vec3 lightNormal = normalize(lightDir);',
    '        float distToSurf = length(lightDir) * uCamera.w;',
    '        float diffuseFactor = max(dot(normal, lightNormal), 0.0);',
    '        float radius = (light.radius / res.x * uCamera.w) * uCamera.w;',
    '        float attenuation = clamp(1.0 - distToSurf * distToSurf / (radius * radius), 0.0, 1.0);',
    '        vec3 diffuse = light.color * diffuseFactor;',
    '        finalColor += (attenuation * diffuse) * light.intensity;',
    '    }',
    '',
    '    vec4 colorOutput = vec4(uAmbientLightColor + finalColor, 1.0);',
    '    gl_FragColor = color * vec4(colorOutput.rgb * colorOutput.a, colorOutput.a);',
    '',
    '}',
    ''
].join('\n');
